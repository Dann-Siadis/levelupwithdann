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
