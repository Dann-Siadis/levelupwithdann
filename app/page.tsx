import Link from "next/link"
import { client } from "@/lib/sanity"
import type { Metadata } from "next"

export const revalidate = 60

export const metadata: Metadata = {
  title: "LevelUpWithDann — Gaming Reviews, Gear & Kickboxing",
  description:
    "Honest game reviews, top gear picks, gaming blogs, and kickboxing content. No fluff — just real takes from Dann.",
  alternates: { canonical: "https://www.levelupwithdann.com" },
  openGraph: {
    title: "LevelUpWithDann — Gaming Reviews, Gear & Kickboxing",
    description: "Honest game reviews, top gear picks, gaming blogs, and kickboxing content.",
    url: "https://www.levelupwithdann.com",
    siteName: "LevelUpWithDann",
    type: "website",
  },
}

const categories = [
  {
    href: "/reviews",
    label: "Game Reviews",
    description: "Honest takes on the latest releases — scored and broken down",
    icon: "🎮",
  },
  {
    href: "/gear",
    label: "Gear Reviews",
    description: "Mice, keyboards, headsets and more — tested by a real gamer",
    icon: "🎧",
  },
  {
    href: "/blogs",
    label: "Gaming Blogs",
    description: "Tips, tier lists, and hot takes on gaming culture",
    icon: "✍️",
  },
  {
    href: "/kickboxing",
    label: "Kickboxing",
    description: "Training logs, fight prep, and the athlete side of Dann",
    icon: "🥊",
  },
]

export default async function Home() {
  const [reviews, blogs] = await Promise.all([
    client
      .fetch(
        `*[_type == "review"] | order(_createdAt desc)[0...6]{
          title, "slug": slug.current, rating, platform, category, excerpt, publishedAt
        }`
      )
      .catch(() => [] as any[]),
    client
      .fetch(
        `*[_type == "blog"] | order(publishedAt desc)[0...3]{
          title, "slug": slug.current, category, excerpt, publishedAt
        }`
      )
      .catch(() => [] as any[]),
  ])

  return (
    <>
      {/* Hero */}
      <section className="hero-bg min-h-[90vh] flex items-center justify-center text-center px-6 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#00ff88]/60 mb-6">
            Gaming · Gear · Kickboxing
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-white">
            Level Up Your
            <br />
            <span className="text-[#00ff88]">Game</span>
          </h1>
          <p className="text-lg text-white/50 max-w-xl mx-auto mb-10 leading-relaxed">
            Honest reviews, gear picks, and gaming culture — no sponsorships, just real opinions from a gamer who actually plays.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/reviews"
              className="bg-[#00ff88] text-[#0d0d14] font-bold px-8 py-3.5 rounded-lg hover:bg-[#00cc6a] transition text-sm"
            >
              Browse Reviews →
            </Link>
            <Link
              href="/blogs"
              className="border border-white/15 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/5 transition text-sm"
            >
              Read Latest
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <p className="text-xs tracking-[0.3em] uppercase text-[#00ff88]/50 mb-2">Explore</p>
        <h2 className="text-3xl font-bold text-white mb-10">What are you looking for?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map(cat => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group bg-[#1a1a2e] border border-white/5 rounded-2xl p-6 hover:border-[#00ff88]/30 hover:bg-[#1e1e35] transition-all duration-200"
            >
              <span className="text-3xl mb-4 block">{cat.icon}</span>
              <h3 className="font-bold text-white mb-2 group-hover:text-[#00ff88] transition">
                {cat.label}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Reviews */}
      {reviews.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-10">
          <p className="text-xs tracking-[0.3em] uppercase text-[#00ff88]/50 mb-2">Latest</p>
          <h2 className="text-3xl font-bold text-white mb-10">Fresh Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((review: any) => (
              <Link
                key={review.slug}
                href={`/reviews/${review.slug}`}
                className="group bg-[#1a1a2e] border border-white/5 rounded-2xl p-6 hover:border-[#00ff88]/30 transition-all duration-200"
              >
                {review.platform && (
                  <span className="inline-block bg-[#00ff88]/10 text-[#00ff88] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {review.platform}
                  </span>
                )}
                <h3 className="font-bold text-white text-lg mb-2 group-hover:text-[#00ff88] transition line-clamp-2">
                  {review.title}
                </h3>
                {review.excerpt && (
                  <p className="text-white/40 text-sm line-clamp-2 mb-4">{review.excerpt}</p>
                )}
                {review.rating != null && (
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="flex-1 bg-white/5 rounded-full h-1.5">
                      <div
                        className="bg-[#00ff88] h-1.5 rounded-full"
                        style={{ width: `${(review.rating / 10) * 100}%` }}
                      />
                    </div>
                    <span className="text-[#00ff88] text-sm font-bold shrink-0">
                      {review.rating}/10
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/reviews" className="text-sm text-white/40 hover:text-white transition">
              All reviews →
            </Link>
          </div>
        </section>
      )}

      {/* Latest Blogs */}
      {blogs.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-10">
          <p className="text-xs tracking-[0.3em] uppercase text-[#00ff88]/50 mb-2">From the Blog</p>
          <h2 className="text-3xl font-bold text-white mb-10">Latest Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {blogs.map((blog: any) => (
              <Link
                key={blog.slug}
                href={`/blogs/${blog.slug}`}
                className="group bg-[#1a1a2e] border border-white/5 rounded-2xl p-6 hover:border-[#00ff88]/30 transition-all duration-200"
              >
                {blog.category && (
                  <span className="inline-block bg-[#7c3aed]/20 text-[#a78bfa] text-xs font-semibold px-3 py-1 rounded-full mb-3 capitalize">
                    {blog.category}
                  </span>
                )}
                <h3 className="font-bold text-white text-lg mb-2 group-hover:text-[#00ff88] transition line-clamp-2">
                  {blog.title}
                </h3>
                {blog.excerpt && (
                  <p className="text-white/40 text-sm line-clamp-3">{blog.excerpt}</p>
                )}
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/blogs" className="text-sm text-white/40 hover:text-white transition">
              All posts →
            </Link>
          </div>
        </section>
      )}

      {/* About Dann */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-[#1a1a2e] border border-white/5 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
          <div className="shrink-0">
            <div className="w-20 h-20 rounded-full bg-[#00ff88]/10 border-2 border-[#00ff88]/20 flex items-center justify-center text-3xl">
              🎮
            </div>
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#00ff88]/50 mb-2">About</p>
            <h2 className="text-2xl font-bold text-white mb-3">Who is Dann?</h2>
            <p className="text-white/50 leading-relaxed max-w-2xl">
              I'm Dann — gamer, kickboxer, and gear nerd. I built LevelUpWithDann to share honest game reviews and real gear recommendations without the noise. No paid placements, no affiliate pressure — just the content worth your time.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
