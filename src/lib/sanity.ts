import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

export { client, urlFor }
export * from './queries'

// Fetch with a fallback so one failed query doesn't take a page down,
// but log it so an outage shows up in the server logs instead of as an empty page.
export async function fetchOr<T>(label: string, query: string, fallback: T, params: Record<string, unknown> = {}): Promise<T> {
  try {
    const result = await client.fetch<T>(query, params)
    return result ?? fallback
  } catch (err) {
    console.error(`[sanity] ${label} query failed:`, err instanceof Error ? err.message : err)
    return fallback
  }
}
