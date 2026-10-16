import { fetchOr, allPostsQuery, siteSettingsQuery, urlFor } from '@/lib/sanity'
import BlogClient from '@/components/BlogClient'

export const revalidate = 60

export default async function BlogPage() {
  const [posts, settings] = await Promise.all([
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchOr<any[]>('posts', allPostsQuery, []),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchOr<any>('siteSettings', siteSettingsQuery, null),
  ])

  const blogHeroImage = settings?.blogHeroImage ? urlFor(settings.blogHeroImage).url() : null

  return <BlogClient posts={posts} blogHeroImage={blogHeroImage} />
}
