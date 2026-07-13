# Analytics — Cloudflare Web Analytics

Decision **D3** in `WEBSITE-BUILD-SPEC.md` (mascotAI/docs/product): the site uses **Cloudflare Web
Analytics** — free, cookieless, no PII, COPPA-friendly, and privacy-light by design for a
children's brand.

## What it is

A standalone JavaScript beacon (`beacon.min.js`). It works on **GitHub Pages with no proxy and no
DNS change** — you do NOT move `sissythebutterfly.com` DNS to Cloudflare. It reports automatic
**pageviews** + core web-vitals to the Cloudflare dashboard.

## What it does NOT do (and why)

Cloudflare Web Analytics is **dashboard-only** — there is no programmatic API and **no supported
custom-event push**. So retailer-click / printable-download / newsletter events are **not** counted
here. Those clicks are still captured client-side into `window.__sissyEvents` (see the event-sink
seam in `src/layouts/DefaultLayout.astro`) and left queued on purpose.

- **CF Web Analytics = traffic truth** (pageviews, referrers, top pages).
- **KDP dashboard = sales truth** (units, royalties). CF cannot see sales; KDP is authoritative.

## Config seam

Everything lives in **`src/config/analytics.ts`** (single source of truth):

- `CF_BEACON_TOKEN` — empty string ⇒ analytics **OFF** (no beacon injected; graceful no-op). Paste
  the dashboard token to turn it ON. The token is a **public** site identifier (embedded in page
  HTML), not a secret — committing it is expected.
- `CF_BEACON_SPA` — `true`, because the site uses Astro `<ClientRouter />` (View Transitions):
  navigations are client-side and must be tracked as SPA route changes.
- The layout checks `analyticsEnabled` and injects the beacon only when a token is set — same
  ship-inert gate pattern as the 037 newsletter gate.

## Operator turnkey steps (~5 min, no DNS change)

1. Create a free Cloudflare account: <https://dash.cloudflare.com/sign-up>.
2. Dashboard → **Analytics & Logs → Web Analytics**.
3. **Add a site** → hostname `sissythebutterfly.com` → choose the **standalone / JS beacon** option
   (do NOT move DNS to Cloudflare).
4. Copy the **token** (long hex) from the shown `data-cf-beacon='{"token":"…"}'` snippet.
5. Paste it into `CF_BEACON_TOKEN` in `src/config/analytics.ts`.
6. Merge / deploy. Pageviews appear in the dashboard within minutes.

## Precise-events upgrade path (future)

If exact retailer-click / printable-download counts are wanted, **self-host Umami or Plausible on
the NAS** and drain `window.__sissyEvents` to it (add a POST in the event-sink seam). That is the
only route to first-party custom events — CF Web Analytics deliberately does not offer them.

_Verified against Cloudflare Web Analytics docs 2026-07-13: standalone beacon =
`https://static.cloudflareinsights.com/beacon.min.js`, `data-cf-beacon='{"token":"…","spa":true}'`._
