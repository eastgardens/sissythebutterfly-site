/**
 * Book buy links — the SINGLE SOURCE OF TRUTH (coding-rules §1: config, not scattered hardcodes).
 *
 * Amazon is the PRIMARY seller everywhere so reviews concentrate on ONE listing — Amazon reviews
 * drive Amazon ranking + social proof, and a split across retailers dilutes both (operator call,
 * 2026-07-19). Secondary retailers stay available on the book page only, as a small "also at" line.
 */
export const BOOK_AMAZON = {
  name: 'Amazon',
  href: 'https://a.co/d/07GmSdEm',
  event: 'retailer_click_amazon',
} as const

export const BOOK_SECONDARY_RETAILERS = [
  {
    name: 'Barnes & Noble',
    href: 'https://www.barnesandnoble.com/s/9798993255316',
    event: 'retailer_click_bn',
  },
  {
    name: 'Walmart',
    href: 'https://www.walmart.com/search?q=9798993255309',
    event: 'retailer_click_walmart',
  },
] as const

/** All sellers (Amazon first) — for the Book structured-data offers list. */
export const BOOK_ALL_RETAILERS = [BOOK_AMAZON, ...BOOK_SECONDARY_RETAILERS] as const

export const BOOK_ISBN = '9798993255316'
export const BOOK_GTIN13 = '9798993255309'

/** Amazon ASIN (from the a.co product link) + a direct "write a review" deep-link that drops a
 * logged-in shopper straight onto the review form for Book 1 (one tap, not a scroll-hunt). */
export const BOOK_ASIN = 'B0FW21Z58R'
export const BOOK_AMAZON_REVIEW_URL = `https://www.amazon.com/review/create-review?asin=${BOOK_ASIN}`
