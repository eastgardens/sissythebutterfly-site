/**
 * Analytics configuration (WEBSITE-BUILD-SPEC D3) — single source of truth for the site's
 * privacy-light traffic analytics.
 *
 * PROVIDER = Cloudflare Web Analytics (free, cookieless, no PII, COPPA-friendly). It is a
 * standalone JavaScript beacon — it works on GitHub Pages with no proxy, no DNS change, and no
 * Cloudflare-hosted DNS. It reports automatic PAGEVIEWS + core web-vitals to the Cloudflare
 * dashboard. Cloudflare Web Analytics is DASHBOARD-ONLY: there is no programmatic API and no
 * supported custom-event push, so retailer-click / printable-download events are NOT captured
 * here (see the `window.__sissyEvents` seam in DefaultLayout.astro for the upgrade path).
 *
 * The KDP (Kindle Direct Publishing) dashboard remains the SALES TRUTH — CF gives traffic, KDP
 * gives royalties/units. Precise first-party events await a self-hosted sink (see below).
 *
 * ── SHIPS INERT UNTIL A TOKEN IS SET ──────────────────────────────────────────────────────────
 * Same gate pattern as the 037 newsletter gate: with `CF_BEACON_TOKEN = ''` the beacon is a
 * graceful no-op (nothing is injected). The site builds and deploys with analytics OFF until a
 * real token is pasted below. The beacon token is NOT a secret — it is a public site identifier
 * embedded in the page HTML, so committing it here is expected and safe (unlike API keys).
 *
 * ── OPERATOR TURNKEY STEPS (~5 min, NO DNS change needed) ─────────────────────────────────────
 *   1. Create a free Cloudflare account at https://dash.cloudflare.com/sign-up (email + password).
 *   2. In the dashboard sidebar, open  Analytics & Logs → Web Analytics.
 *   3. Click "Add a site". Enter the hostname:  sissythebutterfly.com
 *      (choose the "standalone / JS beacon" option — do NOT move DNS to Cloudflare).
 *   4. Cloudflare shows a snippet containing  data-cf-beacon='{"token":"<LONG_HEX_TOKEN>"}'.
 *      Copy just the token value (the long hex string).
 *   5. Paste it into `CF_BEACON_TOKEN` below (between the quotes) and save.
 *   6. Commit / merge this branch. On the next deploy the beacon goes live; pageviews appear in
 *      the Cloudflare dashboard within a few minutes.
 *
 * ── PRECISE-EVENTS UPGRADE PATH (future) ──────────────────────────────────────────────────────
 * If the operator later wants exact retailer-click / printable-download counts, self-host Umami
 * or Plausible on the NAS and drain `window.__sissyEvents` to it (the array is already populated
 * on every [data-event] click). That is the only way to get first-party custom events; CF Web
 * Analytics deliberately does not offer them.
 */

/**
 * Cloudflare Web Analytics beacon token. Empty string ⇒ analytics OFF (no beacon injected).
 * Paste the token from the Cloudflare dashboard (see step 4 above) to turn analytics ON.
 */
export const CF_BEACON_TOKEN = ''

/**
 * SPA mode. This site uses Astro `<ClientRouter />` (View Transitions), so page navigations are
 * client-side — the beacon must track them as SPA route changes or interior pageviews are missed.
 * Cloudflare's own guidance: `spa: true` for client-routed sites. Leave true unless ClientRouter
 * is removed from DefaultLayout.astro.
 */
export const CF_BEACON_SPA = true

/** True only when a real token is set — the single gate the layout checks before injecting. */
export const analyticsEnabled = CF_BEACON_TOKEN.length > 0

/**
 * The exact `data-cf-beacon` config object, JSON-serialized by the layout. Built here so the
 * beacon config lives in one place. Verified against Cloudflare Web Analytics docs 2026-07-13:
 * standalone beacon = `https://static.cloudflareinsights.com/beacon.min.js` with
 * `data-cf-beacon='{"token":"…","spa":true}'`.
 */
export const cfBeaconConfig = { token: CF_BEACON_TOKEN, spa: CF_BEACON_SPA }
