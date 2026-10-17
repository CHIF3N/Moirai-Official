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

// MO women's jackets — burgundy velvet (photos supplied by the owner, 17 Oct 2026; the
// product shot is cropped to remove a printed "shipping world wide" line, as delivery isn't finalised)
export const MO_IMAGES: { src: string; width: number; height: number; alt: string; caption: string; post?: string }[] = [
  { src: '/mo/velvet-jacket-duo.jpg', width: 819, height: 1024, alt: 'Two women in burgundy velvet MO jackets, one with jeans, one with a black feather skirt', caption: 'MO women’s jackets — burgundy velvet.' },
  { src: '/mo/velvet-jacket-portrait.jpg', width: 669, height: 1024, alt: 'Woman in a burgundy velvet MO jacket holding an MO card', caption: 'Cropped, cinched, velvet.' },
  { src: '/mo/velvet-jacket-sofa.jpg', width: 819, height: 1024, alt: 'Woman in a burgundy velvet MO jacket seated on a sofa beside an MO by Moirai bag', caption: 'With the MO bag.' },
  { src: '/mo/velvet-jacket-card.jpg', width: 819, height: 1024, alt: 'Two women in burgundy velvet MO jackets, one holding an MO card', caption: 'MO, worn together.' },
  { src: '/mo/velvet-jacket-product.jpg', width: 1024, height: 845, alt: 'Burgundy velvet MO jacket with puff sleeves on a hanger, MO logo over it', caption: 'The velvet jacket, up close.' },
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
