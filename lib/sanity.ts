import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: 'pgrlvmib',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
})

const builder = createImageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)

// Picks the most specific active banner for a given `cat` (category, or ''
// for pages with no category — e.g. the homepage): a banner tagged with
// `cat` in its `categories` wins over the untagged fallback banner, and an
// untagged, category-less doc never matches a non-empty `cat` it wasn't
// tagged for, so category-scoped banners stay confined to their pages.
export function bannerQuery(type: string, projection: string) {
  return `
    *[_type == "${type}" && active == true && (
      ($cat != "" && $cat in categories) ||
      (!defined(categories) || count(categories) == 0)
    )] | order(count(categories) desc)[0]{ ${projection} }
  `
}
