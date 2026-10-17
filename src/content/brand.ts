// Brand content supplied by the owner (16 Oct 2026) — the source of truth for
// categories, slogans and values. Images are existing Moirai photographs from the
// Sanity media library, used as editorial imagery until the official photoshoot.
// To replace one, swap its `image` for another Sanity asset id.

export const SLOGANS = {
  becoming: 'Made for who you are becoming.',
  refined: 'Refined. Intentional. Eternal.',
  destiny: 'Destiny, Tailored.',
  identity: 'Not a trend. Identity.',
}

export const VALUES = [
  { title: 'Customer experience', desc: 'Every interaction is personal. You are not a transaction.' },
  { title: 'Craftsmanship excellence', desc: 'We obsess over the details others overlook.' },
  { title: 'Empowerment through style', desc: 'Fashion is the language of confidence.' },
  { title: 'Sustainability', desc: 'Intentional creation. Pieces made to last.' },
]

export interface Category {
  slug: string
  title: string
  short: string
  description: string
  image: string // Sanity image asset id
  imageAlt: string
  // Words that place a Sanity product in this category (matched against its category title)
  match: string[]
  enquiry: string
}

export const CATEGORIES: Category[] = [
  {
    slug: 'bespoke',
    title: 'Bespoke & custom couture',
    short: 'Bespoke',
    description: 'Pieces designed and made for one person — shaped by a conversation about your occasion, your story and your body.',
    image: 'image-ae25c4f9852cbf954116fc26906a873de8a46b2d-1080x1080-jpg',
    imageAlt: 'Ivory couture gown with sculpted lace bodice, photographed on a balcony',
    match: ['bespoke', 'custom', 'couture', 'bridal', 'wedding'],
    enquiry: 'Hi Moirai! I would like to start a bespoke commission.',
  },
  {
    slug: 'corsets',
    title: 'Corsets',
    short: 'Corsets',
    description: 'Structured, figure-defining corsetry for bold silhouettes — worn as a statement on its own or as part of a complete look.',
    image: 'image-30c127df06aa843a2b9b77b1d75f5741d833185c-1024x1280-jpg',
    imageAlt: 'Red corseted dress against a deep green studio backdrop',
    match: ['corset'],
    enquiry: 'Hi Moirai! I am interested in a corset.',
  },
  {
    slug: 'cocktail-dresses',
    title: 'Cocktail dresses',
    short: 'Cocktail',
    description: 'Cocktail dresses for the evenings that matter, from sculpted minis to dramatic silhouettes.',
    image: 'image-bffaef3c90af019078755055f649ad3b2c8ba9a4-1024x1280-jpg',
    imageAlt: 'Red strapless cocktail dress with embellished neckline on a white studio background',
    match: ['cocktail', 'dress', 'gown', 'evening'],
    enquiry: 'Hi Moirai! I am interested in a cocktail dress.',
  },
  {
    slug: 'cameroonian-traditional',
    title: 'Cameroonian traditional fashion',
    short: 'Traditional',
    description: 'Cameroonian traditional attire, reimagined through a contemporary couture eye — heritage textiles in modern silhouettes.',
    image: 'image-4bb159520b9ad2cb92c3d65afda9b759da08449c-1080x1080-jpg',
    imageAlt: 'Flowing printed gown in blue and earth tones, photographed outside a weathered wooden house',
    match: ['tradition', 'cameroon', 'heritage', 'african', 'culture'],
    enquiry: 'Hi Moirai! I am interested in Cameroonian traditional fashion.',
  },
]

export function categoryFor(productCategory: string | null | undefined): Category | null {
  const c = (productCategory || '').toLowerCase()
  if (!c) return null
  return CATEGORIES.find(cat => cat.match.some(m => c.includes(m))) ?? null
}

// Placeholder documents in Sanity that should never appear publicly.
// Remove ids from this list once the documents are deleted in the Studio.
export const HIDDEN_DOCUMENT_IDS = [
  '7e62ac3b-e809-4eca-b6b8-429ce2be79c9', // product "Wedding Dresses" — test entry
  '89fa1b4b-ad2f-4567-a216-1a5d9a356b59', // product "Jacket" — test entry
  '89e17d1f-c87a-44ff-9d99-bde5f31d5593', // post "TEST BLOG"
]

// Editorial photographs used in fixed homepage sections (Sanity asset ids)
export const EDITORIAL = {
  homeBespoke: { image: 'image-0e028a436b1bf268ac01ff15576417b59ccbf7ae-1023x1280-jpg', alt: 'Red sculpted gown with voluminous sleeves against a red backdrop' },
  homeClosing: { image: 'image-37e23fa99829eeeaa120ee3e6877e93fd9388437-1024x1280-jpg', alt: '' },
}

// Media from the brand's own Instagram (@moirai.th_), downloaded 17 Oct 2026 at the owner's request.
// Only posts published by Moirai itself — collaboration posts belong to other accounts and need their permission.
export const SOCIAL_MEDIA = {
  bridalVideo: {
    src: '/social/bridal-box.mp4',
    poster: '/social/bridal-box-poster.jpg',
    caption: 'We prepared a special box for a special lady on her special day.',
    alt: 'A bride in a white robe opens an orange Moirai gift box on her wedding morning',
    post: 'https://www.instagram.com/p/DZsQAiHgN-C/',
  },
  images: [
    {
      src: '/social/jacket-collection-green.jpg',
      width: 1200, height: 1200,
      alt: 'Man in a green geometric-quilted Moirai jacket, seated, in front of the Moirai wordmark',
      caption: 'The Moirai Jacket Collection — “our definition of luxury is comfort.”',
      post: 'https://www.instagram.com/p/DPD6LeFDX8V/',
    },
    {
      src: '/social/pink-october.jpg',
      width: 900, height: 1600,
      alt: 'Woman in a tailored white blazer and black leggings for Pink October',
      caption: 'Pink October — standing together for early detection.',
      post: 'https://www.instagram.com/p/DPXKV0WgNfm/',
    },
  ],
}

// Homepage hero slideshow (Sanity asset ids). The hero image set in Site Settings is always shown first.
// `position` keeps the subject in frame when the photo is cropped.
export const HERO_SLIDES = [
  { image: 'image-b3286dd4eaa4c861c263cb3cb9616cc02186dc1c-1080x1080-jpg', alt: 'Woman in a blue headwrap and flowing printed Moirai gown seated outside a weathered wooden house', position: '72% 60%' },
  { image: 'image-b6a50a0988279ec0e989bb6a301a027fef592b29-1024x1280-jpg', alt: 'Woman in a red printed Moirai dress with sculpted off-shoulder sleeves on a staircase', position: '50% 30%' },
  { image: 'image-870b382ac4b95e942d3b3f91989da7c8939541c8-1033x1280-jpg', alt: 'Portrait in a sculptural black lace headpiece and printed Moirai garment', position: '50% 25%' },
  { image: 'image-3751fe686ce1c07a4d6a86dcede8d02bc308a769-1080x1080-jpg', alt: 'A bride in an ivory Moirai gown framed by a tall glass doorway', position: '50% 45%' },
]

// Videos from the brand's TikTok (@threads_ofheritage), confirmed via TikTok's official oEmbed on 17 Oct 2026.
// Covers are stored locally; the video itself plays in TikTok's official embed player, loaded only on tap.
export const TIKTOK_VIDEOS = [
  { id: '7688726718999285012', title: 'STASIS — your new favourite jacket', credit: '📸 @Baby Jesus', cover: '/social/tiktok-7688726718999285012.jpg', logoCover: true },
  { id: '7690500692359826708', title: 'The Velvet Puff STÁSIS', credit: '📸 @Sam-Sona · Muse @melanin_babi', cover: '/social/tiktok-7690500692359826708.jpg', logoCover: true },
  { id: '7675028383817862421', title: 'Every outfit tells a story — the pink power suit', credit: null, cover: '/social/tiktok-7675028383817862421.jpg' },
  { id: '7686024256123227413', title: 'The long wait is over — a first look', credit: null, cover: '/social/tiktok-7686024256123227413.jpg', logoCover: true },
  { id: '7548356979756911928', title: 'The leather jacket', credit: null, cover: '/social/tiktok-7548356979756911928.jpg' },
]
