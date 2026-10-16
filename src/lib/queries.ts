// Every GROQ query the site uses, matched to the schema in src/sanity/schemaTypes.
import { HIDDEN_DOCUMENT_IDS } from '@/content/brand'

// Never show documents marked "Hide from site" or known placeholder documents
const visible = `hiddenFromSite != true && !(_id in ${JSON.stringify(HIDDEN_DOCUMENT_IDS)})`

// Older products store `category` as a plain string instead of a reference.
// Resolve both to a title string so pages never see a raw {_ref} object.
const categoryTitle = `"category": coalesce(category->title, select(defined(category._ref) => null, category))`

const productCardFields = `
  _id,
  title,
  slug,
  price,
  "priceType": coalesce(priceType, "fixed"),
  "available": coalesce(available, true),
  image,
  images,
  description,
  ${categoryTitle}
`

export const allProductsQuery = `*[_type == "product" && ${visible}] | order(_createdAt desc) { ${productCardFields} }`

export const featuredProductsQuery = `*[_type == "product" && featured == true && ${visible}] | order(_createdAt desc)[0...6] { ${productCardFields} }`

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug && ${visible}][0] {
  ${productCardFields},
  sizes,
  colors,
  sizeGuide,
  fabricDetails,
  deliveryInfo,
  relatedProducts[]->{ _id, title, slug, price, "priceType": coalesce(priceType, "fixed"), image }
}`

export const recentPostsQuery = `*[_type == "post" && ${visible}] | order(publishedAt desc)[0...3] {
  _id, title, slug, excerpt, mainImage, publishedAt
}`

export const allPostsQuery = `*[_type == "post" && ${visible}] | order(publishedAt desc) {
  _id, title, slug, mainImage, excerpt, publishedAt
}`

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug && ${visible}][0] {
  _id, title, slug, excerpt, mainImage, body, gallery, publishedAt
}`

export const siteSettingsQuery = `*[_type == "siteSettings"][0]`
