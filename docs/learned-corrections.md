# Learned corrections — sissythebutterfly-site

Dated lessons from real bugs in this repo. Append in the same edit as the fix.

- **2026-07-11 — Never let a post-build minifier re-minify already-minified CSS.**
  astro-compress's html-minifier-terser pass ran clean-css over inline `<style>` blocks that Vite
  had already minified, and silently dropped Astro scoped base rules as "overridden"
  (order-dependent: `.feature{position:relative;...}` survived on the homepage, vanished on every
  interior page → each card's ::before/::after escaped to viewport size and covered the page).
  Fix: `compress({ HTML: { 'html-minifier-terser': { minifyCSS: false } } })` — keep image/HTML/JS
  compression, trust the build's own CSS minifier. Symptom signature to remember: source correct +
  dev build correct + deployed page broken ⇒ diff the *final* dist CSS against source, per page.

- **2026-07-12 — "brave" is an adjective, NEVER a noun (operator, twice).**
  Say "courage" / "her courage" / "find their courage" — never "your brave", "find their brave",
  or "I found my brave". The "I found my brave" phrasing was an internal draft line the operator
  NEVER approved; it was purged from canon. The generated-content gate flags this, but HAND-WRITTEN
  site copy bypasses that gate — so check any copy touching courage/bravery by eye before committing.
