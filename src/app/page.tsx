import { fetchOr, allProductsQuery, featuredProductsQuery, siteSettingsQuery, urlFor } from '@/lib/sanity'
import { getJournalEntries } from '@/lib/journal'
import HomeClient from '@/components/HomeClient'
import { CATEGORIES, EDITORIAL } from '@/content/brand'

export const revalidate = 60

/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function HomePage() {
  const [products, posts, settings, latestProducts] = await Promise.all([
    fetchOr<any[]>('featured products', featuredProductsQuery, []),
    getJournalEntries(),
    fetchOr<any>('siteSettings', siteSettingsQuery, null),
    fetchOr<any[]>('latest products', allProductsQuery, []),
  ])

  // Resolve image URLs on the server (can't pass functions to Client Components)
  const withImageUrl = (p: any, width: number) => ({
    ...p,
    imageUrl: p.image ? urlFor(p.image).width(width).quality(85).url() : null,
  })

  const productsWithUrls = products.map((p: any) => ({
    ...withImageUrl(p, 520),
    images: Array.isArray(p.images)
      ? p.images.map((img: any) => (img ? urlFor(img).width(520).url() : null)).filter(Boolean)
      : [],
  }))

  const heroImageUrl = settings?.heroImage ? urlFor(settings.heroImage).width(1600).quality(85).url() : undefined
  const heroText = settings?.heroText

  // The owner's four categories, each with its own editorial photograph
  const collections = CATEGORIES.map(c => ({
    title: c.title,
    slug: c.slug,
    image: urlFor(c.image).width(900).quality(85).url(),
    alt: c.imageAlt,
  }))

  const heroSlides = settings?.heroSlides?.map((s: any) => ({
    title: s.title,
    subtitle: s.subtitle,
    image: s.image ? urlFor(s.image).width(1600).quality(90).url() : undefined,
  })) || []

  const lookbook = settings?.lookbook?.map((l: any) => ({
    title: l.title,
    description: l.description,
    date: l.date,
    images: Array.isArray(l.images) ? l.images.map((img: any) => urlFor(img).width(800).quality(85).url()) : [],
  })) || []

  const bespokeHeroImage = urlFor(EDITORIAL.homeBespoke.image).width(1200).quality(85).url()
  const schoolImage = settings?.fashionSchoolHeroImage
    ? urlFor(settings.fashionSchoolHeroImage).width(1200).quality(85).url()
    : undefined
  const closingImage = urlFor(EDITORIAL.homeClosing.image).width(1600).quality(80).url()

  const postsWithUrls = posts.slice(0, 3)

  // Homepage gallery: the latest pieces in the catalogue
  const editorialItemsWithUrls = latestProducts.slice(0, 8).map((p: any) => withImageUrl(p, 800))

  // Use first hero slide image as lead editorial hero image
  const leadHeroImageUrl = heroSlides?.[0]?.image || heroImageUrl

  return (
    <HomeClient
      products={productsWithUrls}
      posts={postsWithUrls}
      collections={collections}
      heroImageUrl={heroImageUrl}
      heroText={heroText}
      heroSlides={heroSlides}
      lookbook={lookbook}
      bespokeHeroImage={bespokeHeroImage}
      schoolImage={schoolImage}
      closingImage={closingImage}
      editorialItems={editorialItemsWithUrls}
      leadHeroImageUrl={leadHeroImageUrl}
    />
  )
}
