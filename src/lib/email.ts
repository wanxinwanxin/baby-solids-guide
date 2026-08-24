import { Resend } from "resend";
import { BRAND } from "@/lib/brand";

/**
 * Transactional email via Resend — lights up when RESEND_API_KEY is set.
 * Without a verified sending domain, Resend's free tier only delivers from
 * onboarding@resend.dev to the account owner's own address; set EMAIL_FROM
 * to a verified-domain sender to reach real users.
 */

export const emailEnabled = !!process.env.RESEND_API_KEY;

let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

const FROM = process.env.EMAIL_FROM ?? `${BRAND} <onboarding@resend.dev>`;

export async function sendEmail(input: {
  to: string;
  subject: string;
  text: string;
  actionUrl?: string;
  actionLabel?: string;
}): Promise<boolean> {
  if (!emailEnabled) return false;
  const { to, subject, text, actionUrl, actionLabel } = input;
  const html = `
  <div style="font-family:-apple-system,Segoe UI,sans-serif;max-width:520px;margin:0 auto;padding:24px;color:#1F2E26">
    <p style="font-weight:700;font-size:18px;margin:0 0 16px">${BRAND}</p>
    <p style="font-size:15px;line-height:1.6">${text}</p>
    ${
      actionUrl
        ? `<p style="margin:24px 0"><a href="${actionUrl}" style="background:#1E7A52;color:#FBF8F3;border-radius:999px;padding:12px 24px;text-decoration:none;font-weight:600;font-size:15px">${actionLabel ?? "Open"}</a></p>
           <p style="font-size:12px;color:#5D6C62;word-break:break-all">Or paste this link into your browser: ${actionUrl}</p>`
        : ""
    }
    <p style="font-size:12px;color:#5D6C62;margin-top:28px">${BRAND} is a free educational guide, not medical advice. In an emergency, call 911.</p>
  </div>`;
  try {
    const { error } = await getResend().emails.send({
      from: FROM,
      to,
      subject,
      text: actionUrl ? `${text}\n\n${actionUrl}` : text,
      html,
    });
    if (error) {
      console.error("[email] send failed:", error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.error("[email] send threw:", e);
    return false;
  }
}
