import Link from 'next/link'
import Image from 'next/image'

interface AffiliateCardProps {
  title: string
  href: string
  imageUrl?: string
  className?: string
}

export default function AffiliateCard({ title, href, imageUrl, className }: AffiliateCardProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={`group relative rounded-2xl overflow-hidden flex flex-col ${className ?? 'shrink-0 w-40 sm:w-44 md:w-48'}`}
      style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.08)',
        height: '248px',
      }}
    >
      {/* Image 75% */}
      <div className="relative overflow-hidden bg-white/5" style={{ height: '178px' }}>
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
      <div className="px-3 py-2 flex-1 min-w-0">
        <p className="text-xs font-semibold text-white leading-tight line-clamp-2">{title}</p>
      </div>
    </Link>
  )
}
