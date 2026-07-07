import { client, urlFor } from '@/lib/sanity'
import ReviewCard from '@/app/components/ReviewCard'
import type { Metadata } from 'next'

export const revalidate = 60
export const metadata: Metadata = { title: 'Gaming Blogs — LevelUpWithDann' }

export default async function BlogsPage() {
  const posts = await client.fetch(`
    *[_type == "post" && category == "gaming"] | order(publishedAt desc){
      title, subtitle, "slug": slug.current, rating, mainImage, excerpt
    }
  `).catch(() => [] as any[])

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-3xl">🕹️</span>
        <h1 className="text-2xl font-bold text-white">Gaming Blogs</h1>
        {posts.length > 0 && <span className="ml-1 text-white/25 text-sm">{posts.length} posts</span>}
      </div>
      {posts.length === 0 ? (
        <p className="text-white/25 text-sm py-20 text-center">No posts yet — check back soon.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {(posts as any[]).map(post => (
            <ReviewCard
              key={post.slug}
              title={post.title}
              subtitle={post.subtitle}
              href={`/blogs/${post.slug}`}
              imageUrl={post.mainImage ? urlFor(post.mainImage).width(400).height(350).fit('crop').format('webp').quality(80).url() : undefined}
              className="w-full"
            />
          ))}
        </div>
      )}
    </div>
  )
}
