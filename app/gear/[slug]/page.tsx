import { client } from '@/lib/sanity'
import PostDetail from '@/app/components/PostDetail'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{ title }`, { slug }).catch(() => null)
  return { title: post ? `${post.title} — LevelUpWithDann` : 'Gear — LevelUpWithDann' }
}

export default async function GearDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug && category == "gear"][0]{
    title, subtitle, rating, excerpt, body, publishedAt, affiliateLink,
    "imageUrl": mainImage.asset->url
  }`, { slug }).catch(() => null)

  if (!post) notFound()

  return (
    <PostDetail
      title={post.title}
      subtitle={post.subtitle}
      rating={post.rating}
      imageUrl={post.imageUrl}
      body={post.body}
      excerpt={post.excerpt}
      publishedAt={post.publishedAt}
      affiliateLink={post.affiliateLink}
      backHref="/gear"
      backLabel="Gear"
    />
  )
}
