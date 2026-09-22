import { client, featuredProductsQuery, recentPostsQuery, siteSettingsQuery, editorialCatalogQuery, urlFor } from '@/lib/sanity'
import HomeClient from '@/components/HomeClient'

export const revalidate = 60

export default async function HomePage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let products: any[] = []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let posts: any[] = []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let settings: any = null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let editorialItems: any[] = []

  try {
    ;[products, posts, settings, editorialItems] = await Promise.all([
      client.fetch(featuredProductsQuery),
      client.fetch(recentPostsQuery),
      client.fetch(siteSettingsQuery),
      client.fetch(editorialCatalogQuery),
    ])
  } catch {
    // Sanity not yet configured — graceful fallback
  }

  const waNumber = (settings?.whatsappNumber || '237682710405').replace(/\D/g, '')
  const waMsg = encodeURIComponent("Hi, I'd like to inquire about Moirai")

  // Resolve image URLs on the server (can't pass functions to Client Components)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const productsWithUrls = products.map((p: any) => ({
    ...p,
    imageUrl: p.image ? urlFor(p.image).width(520).url() : null,
    images: Array.isArray(p.images)
      ? p.images.map((img: any) => (img ? urlFor(img).width(520).url() : null)).filter(Boolean)
      : [],
  }))

  const heroImageUrl = settings?.heroImage ? urlFor(settings.heroImage).url() : undefined
  const heroText = settings?.heroText

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const collections = settings?.collections?.map((c: any) => ({
    title: c.title,
    slug: c.slug || c.title?.toLowerCase().replace(/ /g, '-'),
    image: c.image ? urlFor(c.image).url() : undefined,
  })).filter((c: any) => c.image || c.title) || []

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // Resolve editorial catalog image URLs on server
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorialItemsWithUrls = editorialItems.map((item: any) => {
    const imgSource = item.mainImage || item.image
    return {
      ...item,
      imageUrl: imgSource ? urlFor(imgSource).width(800).quality(85).url() : null,
      displayTitle: item.title || item.name || null,
    }
  })

  // Use first hero slide image as lead editorial hero image
  const leadHeroImageUrl = heroSlides?.[0]?.image || heroImageUrl

  return (
    <HomeClient
      products={productsWithUrls}
      posts={posts}
      waNumber={waNumber}
      waMsg={waMsg}
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
