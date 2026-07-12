/**
 * Seasonal banner configuration (single source of truth for the homepage seasonal ribbon).
 *
 * The site is static (Astro → GitHub Pages), so the season is resolved at BUILD time. The deploy
 * workflow runs a monthly cron (`.github/workflows/deploy.yml`) so the banner flips on its own
 * without a content push. To retune a season's art or copy, edit its entry below — one place.
 *
 * Art = Jen's painterly seasonal scenes (design-art tier, Jen-approved). Northern-hemisphere
 * meteorological seasons. `seasonForMonth` is pure + injectable so the mapping is unit-testable.
 */
import type { ImageMetadata } from 'astro'
import springImg from '@assets/img/scenes-seasonal/season-spring.png'
import summerImg from '@assets/img/scenes-seasonal/season-summer.png'
import autumnImg from '@assets/img/scenes-seasonal/season-autumn.png'
import winterImg from '@assets/img/scenes-seasonal/season-winter.png'

export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

export interface SeasonBanner {
  season: Season
  image: ImageMetadata
  emoji: string
  greeting: string
  alt: string
}

/** Per-season art + copy. Swap a line here to retune a season's banner. */
const BANNERS: Record<Season, SeasonBanner> = {
  spring: {
    season: 'spring',
    image: springImg,
    emoji: '🌷',
    greeting: 'Spring in the meadow — everything is waking up!',
    alt: 'The meadow in springtime, dotted with fresh blossoms and soft new green.',
  },
  summer: {
    season: 'summer',
    image: summerImg,
    emoji: '☀️',
    greeting: 'Summertime in the meadow — long, sunny days for exploring!',
    alt: 'The meadow in summer, golden and bright under a wide blue sky.',
  },
  autumn: {
    season: 'autumn',
    image: autumnImg,
    emoji: '🍂',
    greeting: 'Autumn in the meadow — a cozy, leaf-crunching season!',
    alt: 'The meadow in autumn, warm with orange and amber leaves.',
  },
  winter: {
    season: 'winter',
    image: winterImg,
    emoji: '❄️',
    greeting: 'Winter in the meadow — quiet, snowy, and full of wonder!',
    alt: 'The meadow in winter, hushed under a soft blanket of snow.',
  },
}

/**
 * Northern-hemisphere meteorological season from a month index (0 = Jan … 11 = Dec).
 * Dec–Feb winter · Mar–May spring · Jun–Aug summer · Sep–Nov autumn. Pure + wraps out-of-range.
 */
export function seasonForMonth(month: number): Season {
  const m = ((Math.trunc(month) % 12) + 12) % 12
  if (m === 11 || m <= 1) return 'winter'
  if (m <= 4) return 'spring'
  if (m <= 7) return 'summer'
  return 'autumn'
}

/** The season for a given date (defaults to now — resolved at build time). */
export function currentSeason(now: Date = new Date()): Season {
  return seasonForMonth(now.getMonth())
}

/** The banner (art + copy) for a given date. Homepage calls this in frontmatter at build time. */
export function seasonBanner(now: Date = new Date()): SeasonBanner {
  return BANNERS[currentSeason(now)]
}
