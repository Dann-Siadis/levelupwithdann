import Link from 'next/link'
import Image from 'next/image'

interface ReviewCardProps {
  title: string
  href: string
  imageUrl?: string
  rating?: number // 1–5
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24">
          <polygon
            points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            fill={i <= Math.round(rating) ? '#e53935' : 'none'}
            stroke={i <= Math.round(rating) ? '#e53935' : 'rgba(255,255,255,0.2)'}
            strokeWidth="1.5"
          />
        </svg>
      ))}
    </div>
  )
}

export default function ReviewCard({ title, href, imageUrl, rating }: ReviewCardProps) {
  return (
    <Link
      href={href}
      className="group shrink-0 w-48 rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.08)',
        height: '240px',
      }}
    >
      {/* Image 75% */}
      <div className="relative overflow-hidden bg-white/5" style={{ height: '180px' }}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="192px"
            style={{ objectFit: 'cover' }}
            className="group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/10 text-5xl">🎮</div>
        )}
      </div>

      {/* Info 25% */}
      <div className="flex items-center gap-2 px-3 py-2 flex-1">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-white leading-tight line-clamp-2 mb-1.5">{title}</p>
          {rating != null && <Stars rating={rating} />}
        </div>
        <div className="shrink-0 w-7 h-7 rounded-full bg-[#e53935] flex items-center justify-center group-hover:bg-[#c62828] transition">
          <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 6h8M7 3l3 3-3 3" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
