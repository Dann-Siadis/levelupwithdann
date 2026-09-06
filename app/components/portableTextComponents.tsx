import { type PortableTextComponents } from '@portabletext/react'
import { urlFor } from '@/lib/sanity'

export const ptComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-2xl font-extrabold text-white mt-8 mb-3 leading-tight">{children}</h1>,
    h2: ({ children }) => <h2 className="text-xl font-bold text-white mt-7 mb-3 leading-tight">{children}</h2>,
    h3: ({ children }) => <h3 className="text-lg font-bold text-white mt-6 mb-2 leading-tight">{children}</h3>,
    h4: ({ children }) => <h4 className="text-base font-semibold text-white mt-5 mb-2">{children}</h4>,
    normal: ({ children }) => <p className="text-sm text-white/70 leading-relaxed mb-4">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-[#e53935] pl-4 my-5 text-sm text-white/50 italic">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-outside pl-5 mb-4 space-y-1 text-sm text-white/70">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-outside pl-5 mb-4 space-y-1 text-sm text-white/70">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-[#e53935] underline hover:text-red-400 transition">
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      const url = value?.asset?._ref
        ? urlFor(value).width(700).format('webp').quality(85).url()
        : null
      if (!url) return null
      return (
        <div className="my-6 rounded-xl overflow-hidden">
          <img src={url} alt={value?.alt ?? ''} className="w-full h-auto" />
        </div>
      )
    },
  },
}
