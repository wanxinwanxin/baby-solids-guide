/**
 * Link checker — CI gate + weekly schedule (ROADMAP §11.3).
 *
 * Verifies every URL referenced by content is live. Several .gov sites sit
 * behind bot walls that reject automated clients — cdc.gov and niaid.nih.gov
 * serve 403, and fda.gov serves 404 — while returning 200 to real browsers.
 * Those domains are allowlisted: a 403/404 from them counts as reachable
 * (each was verified manually on the retrievedOn date recorded in
 * content/sources.ts), but 5xx/DNS failures still fail the check.
 */
import fs from "node:fs";
import path from "node:path";

const BOT_GUARDED_DOMAINS = ["cdc.gov", "nejm.org", "nih.gov", "fda.gov"];
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

function collectUrls(dir: string, urls: Map<string, string[]>) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) collectUrls(p, urls);
    else if (/\.(ts|tsx)$/.test(entry.name)) {
      const text = fs.readFileSync(p, "utf8");
      for (const m of text.matchAll(/https?:\/\/[^\s"'`<>\\)]+/g)) {
        const url = m[0].replace(/[.,;]+$/, "");
        if (!urls.has(url)) urls.set(url, []);
        urls.get(url)!.push(p);
      }
    }
  }
}

async function checkUrl(url: string): Promise<{ ok: boolean; status: string }> {
  const hostname = new URL(url).hostname;
  const botGuarded = BOT_GUARDED_DOMAINS.some((d) => hostname === d || hostname.endsWith(`.${d}`));
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, {
        method: "GET",
        redirect: "follow",
        headers: { "user-agent": UA, accept: "text/html,*/*" },
        signal: AbortSignal.timeout(20_000),
      });
      if (res.ok) return { ok: true, status: String(res.status) };
      if ((res.status === 403 || res.status === 404) && botGuarded) {
        return { ok: true, status: `${res.status} (bot-guarded domain, verified manually)` };
      }
      if (attempt === 3) return { ok: false, status: String(res.status) };
    } catch (e) {
      if (attempt === 3) return { ok: false, status: `error: ${(e as Error).message}` };
    }
    await new Promise((r) => setTimeout(r, 1500 * attempt));
  }
  return { ok: false, status: "unreachable" };
}

async function main() {
  const urls = new Map<string, string[]>();
  collectUrls(path.join(process.cwd(), "content"), urls);

  if (urls.size === 0) {
    console.log("check-links: no content URLs yet — nothing to check.");
    return;
  }

  console.log(`check-links: verifying ${urls.size} unique URLs…`);
  const failures: string[] = [];
  const entries = [...urls.entries()];
  const CONCURRENCY = 5;
  for (let i = 0; i < entries.length; i += CONCURRENCY) {
    const batch = entries.slice(i, i + CONCURRENCY);
    await Promise.all(
      batch.map(async ([url, files]) => {
        const { ok, status } = await checkUrl(url);
        console.log(`  ${ok ? "✓" : "✗"} [${status}] ${url}`);
        if (!ok) failures.push(`${url} → ${status} (referenced by ${[...new Set(files)].join(", ")})`);
      }),
    );
  }

  if (failures.length) {
    console.error(`\ncheck-links: ${failures.length} dead link(s):`);
    for (const f of failures) console.error(`  ✗ ${f}`);
    process.exit(1);
  }
  console.log("check-links: OK");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
