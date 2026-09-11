import { client, bannerQuery } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ProductGallery from '@/app/components/ProductGallery'
import ShopBanner from '@/app/components/ShopBanner'

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = await client.fetch(`*[_type == "product" && slug.current == $slug][0]{ title }`, { slug }).catch(() => null)
  return { title: product ? `${product.title} — LevelUpWithDann` : 'Product — LevelUpWithDann' }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [product, shopBannerData] = await Promise.all([
    client.fetch(`*[_type == "product" && slug.current == $slug][0]{
      title, subtitle, description, price, affiliateLink,
      "imageUrl": mainImage.asset->url,
      "galleryUrls": gallery[].asset->url
    }`, { slug }).catch(() => null),
    client.fetch(
      bannerQuery('shopBanner', '"imageUrl": image.asset->url, heading, subtext, ctaText, ctaLink, "imageUrl2": image2.asset->url, heading2, subtext2, ctaText2, ctaLink2'),
      { cat: 'shop' }
    ).catch(() => null),
  ])

  if (!product) notFound()

  const galleryImages = [product.imageUrl, ...(product.galleryUrls ?? [])].filter(Boolean) as string[]

  return (
    <div className="max-w-2xl mx-auto px-5 pb-16">
      <div className="pt-6 pb-4">
        <a href="/shop" className="text-xs text-white/30 hover:text-white/60 transition">← Shop</a>
      </div>

      <ProductGallery images={galleryImages} alt={product.title} />

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
          className="flex items-center justify-center gap-2 w-full bg-[#e53935] hover:bg-[#c62828] text-white text-sm font-bold py-3 rounded-xl transition shadow-lg mb-10"
        >
          Buy now
        </a>
      )}

      {shopBannerData && (
        <div className="-mx-5">
          <ShopBanner
            imageUrl={shopBannerData.imageUrl}
            heading={shopBannerData.heading}
            subtext={shopBannerData.subtext}
            ctaText={shopBannerData.ctaText}
            ctaLink={shopBannerData.ctaLink}
            imageUrl2={shopBannerData.imageUrl2}
            heading2={shopBannerData.heading2}
            subtext2={shopBannerData.subtext2}
            ctaText2={shopBannerData.ctaText2}
            ctaLink2={shopBannerData.ctaLink2}
          />
        </div>
      )}
    </div>
  )
}
