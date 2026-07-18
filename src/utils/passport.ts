/**
 * Meadow-explorer passport — a tiny, privacy-clean "treasure hunt" state layer.
 *
 * 🔴 COPPA-clean by construction: the ONLY storage is this browser's `localStorage`. No accounts,
 * no network, no cookies, no identifiers — nothing about the child ever leaves the device. The
 * whole feature is progressive enhancement: every page works fully without JavaScript; the passport
 * badges are a bonus that only appears when this module runs.
 *
 * Dependency-free on purpose (no import of the places data) so it never pulls scene-image metadata
 * into the client bundle. Pages own their own DOM and slug list; this module just persists the set
 * of explored slugs and answers questions about it.
 */

const KEY = 'sissy-meadow-passport'

function read(): Set<string> {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return new Set()
    const parsed: unknown = JSON.parse(raw)
    // Defensive: only trust an array of strings; anything else resets to empty (fail-safe, not throw).
    if (Array.isArray(parsed)) {
      return new Set(parsed.filter((s): s is string => typeof s === 'string'))
    }
    return new Set()
  } catch {
    // A private-mode / disabled-storage / corrupt-value environment must never break the page.
    return new Set()
  }
}

function write(slugs: Set<string>): void {
  try {
    localStorage.setItem(KEY, JSON.stringify([...slugs]))
  } catch {
    // Storage unavailable (private mode / quota) — the badge just won't persist. No-op, no throw.
  }
}

/** Every place slug the child has visited. */
export function getExplored(): Set<string> {
  return read()
}

/** Record a place as explored; returns the updated set. Idempotent. */
export function markExplored(slug: string): Set<string> {
  const slugs = read()
  if (!slugs.has(slug)) {
    slugs.add(slug)
    write(slugs)
  }
  return slugs
}

export function hasExplored(slug: string): boolean {
  return read().has(slug)
}

/** True once every slug in `allSlugs` has been explored. */
export function isComplete(allSlugs: readonly string[]): boolean {
  const slugs = read()
  return allSlugs.length > 0 && allSlugs.every((s) => slugs.has(s))
}

/** Clear the passport (the "start over" control). */
export function reset(): void {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // no-op
  }
}
