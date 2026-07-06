import Link from 'next/link'
import Image from 'next/image'

interface ReviewCardProps {
  title: string
  href: string
  imageUrl?: string
  rating?: number // 0–10
  className?: string
}

function ScoreBadge({ score }: { score: number }) {
  const bg = score >= 8 ? '#22c55e' : score >= 6 ? '#f97316' : '#ef4444'
  return (
    <div
      className="absolute top-2 right-2 w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold text-white shadow-lg z-10"
      style={{ background: bg }}
    >
      {score}
    </div>
  )
}

export default function ReviewCard({ title, href, imageUrl, rating, className }: ReviewCardProps) {
  return (
    <Link
      href={href}
      className={`group rounded-2xl overflow-hidden flex flex-col ${className ?? 'shrink-0 w-48'}`}
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
        {rating != null && <ScoreBadge score={rating} />}
      </div>

      {/* Info 25% */}
      <div className="flex items-center gap-2 px-3 py-2 flex-1">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-white leading-tight line-clamp-2">{title}</p>
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
