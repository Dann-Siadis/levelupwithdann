'use client'
import { useRef, type ReactNode } from 'react'

export default function SwipeCarousel({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const isDown = useRef(false)
  const startX = useRef(0)
  const startScrollLeft = useRef(0)

  return (
    <div
      ref={ref}
      className="flex gap-4 overflow-x-auto pb-2 no-scrollbar cursor-grab active:cursor-grabbing select-none"
      onMouseDown={(e) => {
        isDown.current = true
        startX.current = e.pageX - (ref.current?.offsetLeft ?? 0)
        startScrollLeft.current = ref.current?.scrollLeft ?? 0
      }}
      onMouseLeave={() => { isDown.current = false }}
      onMouseUp={() => { isDown.current = false }}
      onMouseMove={(e) => {
        if (!isDown.current || !ref.current) return
        e.preventDefault()
        const x = e.pageX - ref.current.offsetLeft
        ref.current.scrollLeft = startScrollLeft.current - (x - startX.current) * 1.5
      }}
    >
      {children}
    </div>
  )
}
