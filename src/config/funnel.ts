/**
 * Funnel configuration (runbook 2.3d) — single source of truth for email capture + tracking.
 *
 * ⛔ DELIVERABILITY GATE (commission 037): the signup form must NOT collect real addresses until
 * the sending domain is authenticated (SPF/DKIM/DMARC + MailerLite domain auth verified). Until
 * then `NEWSLETTER_ENABLED` stays false and the page shows an "almost ready" state — a
 * spam-foldered welcome email breaks the printable promise on a parent's first touch.
 *
 * TO GO LIVE (at the DNS/domain-auth session, together):
 *   1. In the MailerLite dashboard, create the embedded form; copy its POST action URL.
 *   2. Paste it into `MAILERLITE_ACTION` below and confirm the field name MailerLite expects
 *      (MailerLite embedded forms use `fields[email]`; verify against the dashboard's embed code).
 *   3. Only after domain auth verifies, set `NEWSLETTER_ENABLED = true`.
 */

export const NEWSLETTER_ENABLED = false

/** MailerLite embedded-form POST action URL. Empty until the setup session. */
export const MAILERLITE_ACTION = ''

/** The field name MailerLite expects for the email (confirm against the dashboard embed code). */
export const MAILERLITE_EMAIL_FIELD = 'fields[email]'

/** True only when the form can actually accept an address (gate AND action both satisfied). */
export const newsletterLive = NEWSLETTER_ENABLED && MAILERLITE_ACTION.length > 0

type Utm = { source: string; medium: string; campaign: string; content?: string }

/**
 * Append UTM params to a URL (consistent campaign tagging). Note: inbound social→site UTM is set
 * on the SOCIAL side (the pin/bio links); this helper is for any first-party outbound links that
 * benefit from source tagging. Never put personal data in query strings.
 */
export function withUtm(url: string, utm: Utm): string {
  const u = new URL(url, 'https://sissythebutterfly.com')
  u.searchParams.set('utm_source', utm.source)
  u.searchParams.set('utm_medium', utm.medium)
  u.searchParams.set('utm_campaign', utm.campaign)
  if (utm.content) u.searchParams.set('utm_content', utm.content)
  return u.pathname + u.search
}
