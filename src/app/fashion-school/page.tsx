import { fetchOr, siteSettingsQuery, urlFor } from '@/lib/sanity'
import FashionSchoolClient from '@/components/FashionSchoolClient'

export const revalidate = 60

export default async function FashionSchoolPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const settings = await fetchOr<any>('siteSettings', siteSettingsQuery, null)

  const heroImage = settings?.fashionSchoolHeroImage ? urlFor(settings.fashionSchoolHeroImage).url() : undefined

  return <FashionSchoolClient heroImage={heroImage} />
}
