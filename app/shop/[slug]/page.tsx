import { client } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Metadata } from 'next'

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = await client.fetch(`*[_type == "product" && slug.current == $slug][0]{ title }`, { slug }).catch(() => null)
  return { title: product ? `${product.title} — LevelUpWithDann` : 'Product — LevelUpWithDann' }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await client.fetch(`*[_type == "product" && slug.current == $slug][0]{
    title, subtitle, description, price, affiliateLink,
    "imageUrl": mainImage.asset->url
  }`, { slug }).catch(() => null)

  if (!product) notFound()

  return (
    <div className="max-w-2xl mx-auto px-5 pb-16">
      <div className="pt-6 pb-4">
        <a href="/shop" className="text-xs text-white/30 hover:text-white/60 transition">← Shop</a>
      </div>

      {product.imageUrl && (
        <div className="relative w-full rounded-2xl overflow-hidden mb-6" style={{ height: 'clamp(180px, 40vw, 340px)' }}>
          <Image src={product.imageUrl} alt={product.title} fill style={{ objectFit: 'cover' }} priority />
        </div>
      )}

      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <h1 className="text-xl font-extrabold text-white leading-snug">{product.title}</h1>
          {product.subtitle && <p className="text-sm text-white/40 mt-1">{product.subtitle}</p>}
        </div>
        {product.price && (
          <span className="shrink-0 text-base font-bold text-[#e53935]">{product.price}</span>
        )}
      </div>

      {product.description && (
        <p className="text-white/60 text-sm leading-relaxed mb-8 mt-4">{product.description}</p>
      )}

      {product.affiliateLink && (
        <a
          href={product.affiliateLink}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex items-center justify-center gap-2 w-full bg-[#e53935] hover:bg-[#c62828] text-white text-sm font-bold py-3 rounded-xl transition shadow-lg"
        >
          Buy now
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 7h10M8 3l4 4-4 4" />
          </svg>
        </a>
      )}
    </div>
  )
}
