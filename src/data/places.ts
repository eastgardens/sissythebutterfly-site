/**
 * Places to explore — the meadow's six locations, made interactive (Jen catch 2026-07-17).
 *
 * Single source of truth for the scene pages (`/meadow/[place]`) and the Adventure Map
 * (`/meadow/`). Each place carries its scene art, a gated micro-story, a seek-and-find prompt, and
 * the slugs of the printables that thematically match it.
 *
 * 🔴 The child-facing copy here (story / subtitle / seek) was written by hand and therefore bypasses
 * the mascotAI generator's content gate. It was checked EXPLICITLY through the real Sissy gates
 * (language grammar/readability + child-safety policy + canon tiers) before landing — see
 * mascotAI `scratchpad/gate_places_copy.py`, all 22 strings PASS. Re-gate any edit before shipping.
 *
 * Printable slugs are looked up against the generated `printables.json` catalog at build time and
 * silently filtered if absent, so a renamed/removed sheet never breaks the build.
 */

import type { ImageMetadata } from 'astro'

import { printables, type Printable } from '@data/printables'

import sceneMeadow from '@assets/img/scenes/scene-sunny-meadow.png'
import sceneGarden from '@assets/img/scenes/scene-butterfly-garden.png'
import scenePond from '@assets/img/scenes/scene-pond.png'
import sceneWaterfall from '@assets/img/scenes/scene-waterfall.png'
import sceneSunset from '@assets/img/scenes/scene-sunset-meadow.png'
import sceneForest from '@assets/img/scenes/scene-enchanted-forest.png'

export interface Place {
  /** URL segment: /meadow/<slug>/ */
  slug: string
  /** Display name (matches the homepage tile label). */
  label: string
  /** Scene art (imported from src/ so Astro optimises it). */
  image: ImageMetadata
  /** Honest alt text for the scene. */
  alt: string
  /** Feeling/subtitle line — parent-facing framing. */
  subtitle: string
  /** Sissy's read-aloud micro-moment for the place. */
  story: string
  /** A gentle look-and-find prompt a child can answer from the picture. */
  seek: string
  /** Slugs (in printables.json) whose sheets suit this place, in display order. */
  printableSlugs: string[]
  /** The one coloring page featured as "color this place". */
  coloringSlug: string
}

export const PLACES: Place[] = [
  {
    slug: 'sunny-meadow',
    label: 'The sunny meadow',
    image: sceneMeadow,
    alt: 'A sunny green meadow with a winding path and wildflowers.',
    subtitle: 'Where every adventure begins.',
    story:
      'This is my favorite place to start the day. The grass is warm, the path is soft, and there ' +
      'is always a new flower to say hello to. Come and see what we can find!',
    seek: 'Can you spot three yellow flowers and the winding path?',
    printableSlugs: [
      'meadow-friends-coloring-page',
      'count-the-meadow-counting-sheet',
      'i-spy-the-meadow',
      'meadow-friends-word-search',
      'sissys-meadow-hop-board-game',
    ],
    coloringSlug: 'meadow-friends-coloring-page',
  },
  {
    slug: 'butterfly-garden',
    label: 'The butterfly garden',
    image: sceneGarden,
    alt: 'A bright garden full of big flowers and butterflies.',
    subtitle: 'Where the flowers are tall and the friends are many.',
    story:
      'So many butterflies flutter here. We take turns resting on the biggest blooms and sharing ' +
      'which color we love best. There is always room for one more friend.',
    seek: 'Can you find a pink flower and a purple one?',
    printableSlugs: [
      'sissy-butterfly-coloring-page',
      'make-a-paper-butterfly',
      'design-your-own-butterfly-wings',
      'butterfly-maze',
      'backyard-butterfly-hunt-outdoor-card',
    ],
    coloringSlug: 'butterfly-garden-coloring-page',
  },
  {
    slug: 'lily-pond',
    label: 'The lily pond',
    image: scenePond,
    alt: 'A calm blue pond dotted with lily pads.',
    subtitle: 'A quiet place to rest your wings.',
    story:
      'When my wings feel tired, I come to the pond. I watch the lily pads float and take one slow, ' +
      'deep breath. The water is calm, and soon I feel calm too.',
    seek: 'Can you find three lily pads on the water?',
    printableSlugs: [
      'five-senses-calm-down-card',
      'balloon-belly-calm-down-card',
      'flower-connect-the-dots',
      'match-the-meadow',
    ],
    coloringSlug: 'lily-pond-coloring-page',
  },
  {
    slug: 'waterfall',
    label: 'The waterfall',
    image: sceneWaterfall,
    alt: 'A little waterfall tumbling over mossy rocks.',
    subtitle: 'Big, splashy, and a little bit brave.',
    story:
      'The waterfall is loud and sparkly. At first it felt too big, but Addy held my wing and we ' +
      'watched together. Brave feels better with a friend beside you.',
    seek: 'Can you find the mossy rocks and the splashing water?',
    printableSlugs: [
      'rainbow-breaths-calm-down-card',
      'butterfly-hug-calm-down-card',
      'balloon-belly-calm-down-card',
    ],
    coloringSlug: 'waterfall-coloring-page',
  },
  {
    slug: 'sunset-meadow',
    label: 'Sunset meadow',
    image: sceneSunset,
    alt: 'Rolling hills glowing orange and pink at sunset.',
    subtitle: 'Where we say thank you to the day.',
    story:
      'At the end of the day, the sky turns pink and orange. We each name one small thing that made ' +
      'us smile. It is my favorite way to say goodnight.',
    seek: 'Can you find the setting sun and a pink cloud?',
    printableSlugs: [
      'the-kindness-song-lyric-and-action-sheet',
      'kindness-word-search',
      'friendship-read-aloud-card',
      'courage-quote-poster',
    ],
    coloringSlug: 'sunset-meadow-coloring-page',
  },
  {
    slug: 'enchanted-forest',
    label: 'The Enchanted Forest',
    image: sceneForest,
    alt: 'A magical forest path lit with glowing lanterns.',
    subtitle: 'Where the trees glow and the path feels magical.',
    story:
      'The forest is full of gentle light and soft, glowing lanterns. Every path leads somewhere ' +
      "kind. Take a deep breath, and let's explore together.",
    seek: 'Can you find a glowing lantern and a curved tree?',
    printableSlugs: [
      'butterfly-maze',
      'nature-word-search',
      'flutter-and-freeze-movement-card',
      'the-flutter-song-lyric-and-action-sheet',
    ],
    coloringSlug: 'enchanted-forest-coloring-page',
  },
]

const BY_SLUG: Map<string, Printable> = new Map(printables.map((p) => [p.slug, p]))

/** The catalog entries for a place's printable slugs, in order, skipping any that no longer exist. */
export function printablesFor(place: Place): Printable[] {
  return place.printableSlugs
    .map((slug) => BY_SLUG.get(slug))
    .filter((p): p is Printable => p !== undefined)
}

/** The featured "color this place" sheet, or undefined if it is not in the catalog. */
export function coloringFor(place: Place): Printable | undefined {
  return BY_SLUG.get(place.coloringSlug)
}

export function placeBySlug(slug: string): Place | undefined {
  return PLACES.find((p) => p.slug === slug)
}

/** The next place to explore (wraps), for the "explore the next place" link. */
export function nextPlace(slug: string): Place {
  const i = PLACES.findIndex((p) => p.slug === slug)
  return PLACES[(i + 1) % PLACES.length]
}
