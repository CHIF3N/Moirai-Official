import { fetchOr, allProductsQuery, urlFor } from '@/lib/sanity'
import ShopClient from '@/components/ShopClient'

export const revalidate = 60

export default async function ShopPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const products = await fetchOr<any[]>('shop products', allProductsQuery, [])

  // Resolve image URLs on the server side
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const productsWithUrls = products.map((p: any) => ({
    ...p,
    imageUrl: p.image ? urlFor(p.image).width(900).url() : null,
  }))

  return <ShopClient products={productsWithUrls} />
}
