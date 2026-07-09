import { client } from '@/lib/sanity'
import PostDetail from '@/app/components/PostDetail'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const revalidate = 60

function extractExcerpt(body: any[], max = 160): string {
  if (!body?.length) return ''
  const text = body
    .filter(b => b._type === 'block')
    .map(b => (b.children ?? []).map((c: any) => c.text ?? '').join(''))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
  return text.length > max ? text.slice(0, max - 1) + '…' : text
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{ title, subtitle, excerpt, body }`,
    { slug }
  ).catch(() => null)
  if (!post) return { title: 'Gaming Blog — LevelUpWithDann' }
  const description = post.excerpt || extractExcerpt(post.body)
  return {
    title: `${post.title} — LevelUpWithDann`,
    description,
    openGraph: { title: post.title, description },
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug && category == "gaming"][0]{
    title, subtitle, rating, body, body2, publishedAt, affiliateLink,
    "imageUrl": mainImage.asset->url,
    "recommendedPosts": recommendedPosts[]->{
      title, subtitle, rating, "slug": slug.current, category,
      "imageUrl": mainImage.asset->url
    }
  }`, { slug }).catch(() => null)

  if (!post) notFound()

  return (
    <PostDetail
      title={post.title}
      subtitle={post.subtitle}
      rating={post.rating}
      imageUrl={post.imageUrl}
      body={post.body}
      body2={post.body2}
      publishedAt={post.publishedAt}
      affiliateLink={post.affiliateLink}
      recommendedPosts={post.recommendedPosts}
      backHref="/blogs"
      backLabel="Gaming Blogs"
    />
  )
}
