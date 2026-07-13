# Manual Accessibility & Responsive QA Checklist

<!-- Distilled 2026-07-13 from the golden library:
     Codex/2026-07-08/can/standards/public-building/ACCESSIBILITY_AND_RESPONSIVE_QA_STANDARD.md
     Consumer: every future page-add to this site. Lighthouse does NOT test these —
     this is the manual pass automation cannot replace. Target: WCAG 2.2 AA. -->

**When to run:** any new page or route, the /newsletter flip, and any media-heavy page (galleries, video, embeds).

## 1. Keyboard-only navigation pass
- [ ] Load the page fresh; put the mouse away.
- [ ] Tab through the whole page — every link, button, and form control is reachable.
- [ ] Tab order follows the visual/reading order (no surprise jumps).
- [ ] Activate each important control with Enter/Space — it actually works.
- [ ] No keyboard trap: you can Tab out of every widget, and Esc closes any overlay/menu.

## 2. Focus-visible check
- [ ] At every Tab stop, you can SEE where focus is (a visible outline or highlight).
- [ ] Focus is never hidden behind a sticky header, banner, or overlay.
- [ ] When a dialog/menu closes, focus returns somewhere sensible (not lost at the top).

## 3. 200% zoom reflow
- [ ] Zoom the browser to 200% (Ctrl and +).
- [ ] All text is still readable — no clipping, no overlapping elements.
- [ ] Nothing breaks: nav, buttons, and forms still work at 200%.
- [ ] Reading the page needs no horizontal scrolling.

## 4. 320px stress width
- [ ] Narrow the viewport to 320px (DevTools responsive mode).
- [ ] No horizontal scrollbar for ordinary reading; text wraps cleanly.
- [ ] No overlapping or cut-off content; images stay inside the screen.
- [ ] Critical actions (nav, sign-up, links) are still reachable and tappable.
- [ ] Nothing essential was hidden just to make the layout fit.

## 5. Required viewport widths
Resize through each and glance for overlap, clipped text, or broken layout:
- [ ] 320px (narrow phone stress) · 375/390px (common phone) · 430px (large phone)
- [ ] 768px (tablet portrait) · 1024px (tablet landscape/small desktop)
- [ ] 1280px (desktop) · 1440px+ (wide desktop)
- [ ] Height stress where relevant: landscape phone, modals, sticky headers, long lists.

## 6. Text alternatives & messaging
- [ ] Meaningful images have honest alt text; decorative ones are hidden from assistive tech.
- [ ] Videos have captions; audio-only content has a transcript.
- [ ] Error and status messages are visible, clear, and say what to fix.

## What automation cannot verify (human judgment only)
- Whether alt text is honest (describes what is actually in the image).
- Whether reading order is cognitively clear.
- Whether a cropped/mobile view changes or loses the meaning.
- Whether a screenshot or embed is misleading out of context.
- Whether humor or meaning relies only on a visual cue.

Record any exception or known limit before publishing the page.
