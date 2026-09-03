/**
 * Generates content/read-aloud/english.ts from public-domain sources
 * (Project Gutenberg plain texts and PoetryDB), so the poem texts live in
 * exactly one reviewable, regenerable place. Run: node scripts/gen-read-aloud.mjs
 *
 * Every source is public domain. Do not add copyrighted works here.
 */
import fs from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "content/read-aloud/english.ts");
const CACHE = path.join(process.cwd(), ".cache-read-aloud");
fs.mkdirSync(CACHE, { recursive: true });

async function fetchCached(name, url) {
  const file = path.join(CACHE, name);
  if (fs.existsSync(file)) return fs.readFileSync(file, "utf8");
  const res = await fetch(url, { headers: { "user-agent": "opensolids-gen" } });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  const text = await res.text();
  fs.writeFileSync(file, text);
  return text;
}

/** Extract a titled piece from a Gutenberg text: heading line → next heading. */
function extractGutenberg(text, heading) {
  const lines = text.split(/\r?\n/);
  const isHeading = (l) => /^[A-Z][A-Z0-9 ,.'!?;:-]*$/.test(l.trim()) && l.trim().length > 1;
  const start = lines.findIndex((l) => l.trim() === heading);
  if (start === -1) throw new Error(`Heading not found: ${heading}`);
  const body = [];
  for (let i = start + 1; i < lines.length; i++) {
    const raw = lines[i];
    const l = raw.trim();
    if (/^\[Illustration/i.test(l)) continue;
    if (/^(I|II|III|IV|V|VI|VII|VIII|IX|X)\.?$/.test(l)) {
      body.push(""); // Lear-style roman stanza markers become stanza breaks.
      continue;
    }
    if (l && isHeading(l) && i > start + 1) break;
    body.push(l);
  }
  return toStanzas(body);
}

function toStanzas(lines) {
  const stanzas = [];
  let cur = [];
  for (const l of lines) {
    if (!l) {
      if (cur.length) stanzas.push(cur);
      cur = [];
    } else {
      cur.push(l);
    }
  }
  if (cur.length) stanzas.push(cur);
  return stanzas;
}

async function fetchPoetryDb(author, title) {
  const url = `https://poetrydb.org/author,title/${encodeURIComponent(author)};${encodeURIComponent(title)}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!Array.isArray(data) || !data[0]?.lines) throw new Error(`PoetryDB miss: ${title}`);
  return toStanzas(data[0].lines.map((l) => l.trim()));
}

const MG_URL = "https://www.gutenberg.org/cache/epub/10607/pg10607.txt";
const RLS_URL = "https://www.gutenberg.org/cache/epub/25609/pg25609.txt";
const LEAR_URL = "https://www.gutenberg.org/cache/epub/13650/pg13650.txt";

// heading = exact heading in the source; title = familiar display name.
const MANIFEST = [
  { slug: "twinkle-twinkle", title: "Twinkle, Twinkle, Little Star", author: "Jane Taylor", kind: "rhyme", src: "pdb", pdb: ["Taylor", "The Star"] },
  { slug: "humpty-dumpty", title: "Humpty Dumpty", author: "Traditional", kind: "rhyme", src: "mg", heading: "HUMPTY DUMPTY" },
  { slug: "jack-and-jill", title: "Jack and Jill", author: "Traditional", kind: "rhyme", src: "mg", heading: "JACK AND JILL" },
  { slug: "baa-baa-black-sheep", title: "Baa, Baa, Black Sheep", author: "Traditional", kind: "rhyme", src: "mg", heading: "BAA, BAA, BLACK SHEEP" },
  { slug: "hey-diddle-diddle", title: "Hey Diddle Diddle", author: "Traditional", kind: "rhyme", src: "mg", heading: "THE CAT AND THE FIDDLE" },
  { slug: "hickory-dickory-dock", title: "Hickory, Dickory, Dock", author: "Traditional", kind: "rhyme", src: "mg", heading: "THE MOUSE AND THE CLOCK" },
  { slug: "little-miss-muffet", title: "Little Miss Muffet", author: "Traditional", kind: "rhyme", src: "mg", heading: "MISS MUFFET" },
  { slug: "pat-a-cake", title: "Pat-a-Cake", author: "Traditional", kind: "rhyme", src: "mg", heading: "PAT-A-CAKE" },
  { slug: "little-bo-peep", title: "Little Bo-Peep", author: "Traditional", kind: "rhyme", src: "mg", heading: "LITTLE BO-PEEP" },
  { slug: "little-boy-blue", title: "Little Boy Blue", author: "Traditional", kind: "rhyme", src: "mg", heading: "LITTLE BOY BLUE" },
  { slug: "rock-a-bye-baby", title: "Rock-a-Bye, Baby", author: "Traditional", kind: "rhyme", src: "mg", heading: "ROCK-A-BYE, BABY" },
  { slug: "sleep-baby-sleep", title: "Sleep, Baby, Sleep", author: "Traditional", kind: "rhyme", src: "mg", heading: "SLEEP, BABY, SLEEP" },
  { slug: "the-swing", title: "The Swing", author: "Robert Louis Stevenson", kind: "poem", src: "rls", heading: "THE SWING" },
  { slug: "rain", title: "Rain", author: "Robert Louis Stevenson", kind: "poem", src: "rls", heading: "RAIN" },
  { slug: "owl-and-the-pussy-cat", title: "The Owl and the Pussy-Cat", author: "Edward Lear", kind: "poem", src: "lear", heading: "THE OWL AND THE PUSSY-CAT." },
  { slug: "wynken-blynken-and-nod", title: "Wynken, Blynken, and Nod", author: "Eugene Field", kind: "poem", src: "pdb", pdb: ["Eugene Field", "Wynken, Blynken, and Nod"] },
  { slug: "sonnet-18", title: "Sonnet 18", author: "William Shakespeare", kind: "sonnet", src: "pdb", pdb: ["William Shakespeare", "Sonnet 18"] },
];

const mg = await fetchCached("mg.txt", MG_URL);
const rls = await fetchCached("rls.txt", RLS_URL);
const lear = await fetchCached("lear.txt", LEAR_URL);

const pieces = [];
for (const m of MANIFEST) {
  let stanzas;
  if (m.src === "pdb") stanzas = await fetchPoetryDb(m.pdb[0], m.pdb[1]);
  else stanzas = extractGutenberg({ mg, rls, lear }[m.src], m.heading);
  if (!stanzas.length || !stanzas[0].length) throw new Error(`Empty extraction: ${m.slug}`);
  pieces.push({ slug: m.slug, title: m.title, author: m.author, kind: m.kind, stanzas });
  console.log(`ok ${m.slug}: ${stanzas.length} stanza(s), ${stanzas.flat().length} lines`);
}

const header = `import type { EnglishPiece } from "@/content-schema/read-aloud";

/**
 * GENERATED by scripts/gen-read-aloud.mjs — edit the manifest there and
 * regenerate; do not hand-edit. Sources: Project Gutenberg #10607 (The Real
 * Mother Goose), #25609 (A Child's Garden of Verses), #13650 (Lear's
 * Nonsense Songs), and PoetryDB. All public domain.
 */
export const englishPieces: EnglishPiece[] = `;

fs.writeFileSync(OUT, header + JSON.stringify(pieces, null, 2) + ";\n");
console.log(`wrote ${OUT}`);
