import { client, urlFor } from '@/lib/sanity'
import ReviewCard from '@/app/components/ReviewCard'
import type { Metadata } from 'next'

export const revalidate = 60
export const metadata: Metadata = { title: 'Shop — LevelUpWithDann' }

export default async function ShopPage() {
  const products = await client.fetch(`
    *[_type == "product"] | order(_createdAt desc){
      title, subtitle, "slug": slug.current, mainImage, price, description, affiliateLink
    }
  `).catch(() => [] as any[])

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-3xl">🛒</span>
        <h1 className="text-2xl font-bold text-white">Shop</h1>
        {products.length > 0 && <span className="ml-1 text-white/25 text-sm">{products.length} items</span>}
      </div>
      {products.length === 0 ? (
        <p className="text-white/25 text-sm py-20 text-center">No products yet — check back soon.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {(products as any[]).map(product => (
            <ReviewCard
              key={product.slug}
              title={product.title}
              price={product.price}
              href={product.affiliateLink || `/shop/${product.slug}`}
              imageUrl={product.mainImage ? urlFor(product.mainImage).width(400).height(350).fit('crop').format('webp').quality(80).url() : undefined}
              className="w-full"
            />
          ))}
        </div>
      )}
    </div>
  )
}
