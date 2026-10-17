// MO by Moirai — the house's streetwear line.
// Sources: the owner (MO is the streetwear space), the brand's TikTok @threads_ofheritage
// (STASIS and Velvet Puff STÁSIS captions) and the early-access form linked in both social bios.

export const MO = {
  name: 'MO by Moirai',
  tagline: 'Streetwear from the House of Moirai.',
  intro: 'Designed to make a statement while keeping your look effortlessly chic.',
  // "Get Early Access — MO's Second Drop" (Tally form linked in the brand's Instagram and TikTok bios)
  earlyAccessUrl: 'https://tally.so/r/5B7GAE',
  enquiry: 'Hi! I would like to order from MO by Moirai.',
  // Words that place a Sanity product in MO (matched against its category title or name)
  match: ['mo by moirai', 'streetwear', 'stasis', 'jacket', 'hoodie', 'tee', 'sweat'],
}

// TikTok videos that belong to MO (ids from TIKTOK_VIDEOS in content/brand.ts)
export const MO_VIDEO_IDS = ['7688726718999285012', '7690500692359826708', '7686024256123227413', '7548356979756911928']

export const MO_IMAGES = [
  {
    src: '/social/jacket-collection-green.jpg', width: 1200, height: 1200,
    alt: 'Man in a green geometric-quilted jacket, seated, in front of the Moirai wordmark',
    caption: '“Our definition of luxury is comfort.”',
    post: 'https://www.instagram.com/p/DPD6LeFDX8V/',
  },
  {
    src: '/social/tiktok-7548356979756911928.jpg', width: 540, height: 960,
    alt: 'Green and black geometric-quilted jacket hanging against a pale wall',
    caption: 'The leather jacket.',
    post: 'https://www.tiktok.com/@threads_ofheritage/video/7548356979756911928',
  },
]

// Sanity editorial image from the jacket campaign (asset id)
export const MO_SANITY_IMAGE = {
  image: 'image-57ba95dc162fe8eb8e144b9554f42337f8388769-1080x1080-jpg',
  alt: 'Man in a textured black jacket in profile, in front of the Moirai wordmark',
}

export function isMoProduct(category: string | null | undefined, name: string | null | undefined) {
  const text = `${category || ''} ${name || ''}`.toLowerCase()
  return MO.match.some(m => text.includes(m))
}
