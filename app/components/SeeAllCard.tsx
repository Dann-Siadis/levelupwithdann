import Link from 'next/link'

interface SeeAllCardProps {
  href: string
  total?: number
  label?: string
}

export default function SeeAllCard({ href, total, label = 'See all' }: SeeAllCardProps) {
  return (
    <Link
      href={href}
      className="group shrink-0 w-48 rounded-2xl flex flex-col items-center justify-center gap-3"
      style={{
        background: 'rgba(229,57,53,0.06)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(229,57,53,0.18)',
        height: '240px',
      }}
    >
      <div className="w-12 h-12 rounded-full border border-[#e53935]/30 flex items-center justify-center group-hover:bg-[#e53935]/10 group-hover:border-[#e53935]/60 transition">
        <svg width="22" height="22" fill="none" stroke="#e53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
      <div className="text-center px-4">
        <p className="text-sm font-bold text-white group-hover:text-[#e53935] transition">{label}</p>
        {total != null && total > 0 && (
          <p className="text-xs text-white/25 mt-1">{total} items</p>
        )}
      </div>
    </Link>
  )
}
