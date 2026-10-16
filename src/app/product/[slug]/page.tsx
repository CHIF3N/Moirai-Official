import { fetchOr, productBySlugQuery, urlFor } from '@/lib/sanity'
import ProductDetailClient from '@/components/ProductDetailClient'
import { notFound } from 'next/navigation'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const product = await fetchOr<any>(`product "${slug}"`, productBySlugQuery, null, { slug })

  if (!product) {
    notFound()
  }

  const parsedProduct = {
    id: product._id,
    name: product.title || 'Product',
    price: typeof product.price === 'number' ? product.price : null,
    priceType: product.priceType,
    available: product.available,
    desc: product.description || '',
    category: product.category || 'Other',
    image: product.image ? urlFor(product.image).url() : null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    images: Array.isArray(product.images) ? product.images.map((img: any) => img ? urlFor(img).url() : null).filter(Boolean) : [],
    sizes: Array.isArray(product.sizes) ? product.sizes : [],
    colors: Array.isArray(product.colors) ? product.colors : [],
    sizeGuide: product.sizeGuide,
    fabricDetails: product.fabricDetails,
    deliveryInfo: product.deliveryInfo,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    relatedProducts: Array.isArray(product.relatedProducts) ? product.relatedProducts.filter(Boolean).map((rel: any) => ({
      ...rel,
      image: rel.image ? urlFor(rel.image).url() : null
    })) : [],
    slug
  }

  return <ProductDetailClient product={parsedProduct} />
}
