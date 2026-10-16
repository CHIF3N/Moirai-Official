import { fetchOr, allProductsQuery, featuredProductsQuery, recentPostsQuery, siteSettingsQuery, urlFor } from '@/lib/sanity'
import HomeClient from '@/components/HomeClient'

export const revalidate = 60

/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function HomePage() {
  const [products, posts, settings, latestProducts] = await Promise.all([
    fetchOr<any[]>('featured products', featuredProductsQuery, []),
    fetchOr<any[]>('recent posts', recentPostsQuery, []),
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

  const heroImageUrl = settings?.heroImage ? urlFor(settings.heroImage).url() : undefined
  const heroText = settings?.heroText

  const collections = settings?.collections?.map((c: any) => ({
    title: c.title,
    slug: c.slug || c.title?.toLowerCase().replace(/ /g, '-'),
    image: c.image ? urlFor(c.image).url() : undefined,
  })).filter((c: any) => c.image || c.title) || []

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

  const bespokeHeroImage = settings?.bespokeHeroImage
    ? urlFor(settings.bespokeHeroImage).width(1200).quality(90).url()
    : undefined

  // Homepage gallery: the latest pieces in the catalogue
  const editorialItemsWithUrls = latestProducts.slice(0, 8).map((p: any) => withImageUrl(p, 800))

  // Use first hero slide image as lead editorial hero image
  const leadHeroImageUrl = heroSlides?.[0]?.image || heroImageUrl

  return (
    <HomeClient
      products={productsWithUrls}
      posts={posts}
      collections={collections}
      heroImageUrl={heroImageUrl}
      heroText={heroText}
      heroSlides={heroSlides}
      lookbook={lookbook}
      bespokeHeroImage={bespokeHeroImage}
      editorialItems={editorialItemsWithUrls}
      leadHeroImageUrl={leadHeroImageUrl}
    />
  )
}
