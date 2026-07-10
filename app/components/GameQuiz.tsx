'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Answer {
  text: string
  correct: boolean
}

interface Question {
  question: string
  answers: Answer[]
}

interface GameQuizProps {
  title?: string
  subtitle?: string
  questions: Question[]
  flipImageUrl?: string
  flipBadge?: string
  flipTitle?: string
  flipSubtext?: string
  flipCtaText?: string
  flipCtaLink?: string
}

export default function GameQuiz({
  title = 'Gaming Quiz',
  subtitle,
  questions,
  flipImageUrl,
  flipBadge,
  flipTitle,
  flipSubtext,
  flipCtaText,
  flipCtaLink,
}: GameQuizProps) {
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [flipped, setFlipped] = useState(false)
  const [retrying, setRetrying] = useState(false)

  const total = questions.length
  const question = questions[currentQ]
  const isCorrect = selected !== null && question?.answers[selected]?.correct

  function handleAnswer(idx: number) {
    if (selected !== null) return
    setSelected(idx)
    setRetrying(false)

    if (question.answers[idx].correct) {
      if (currentQ + 1 >= total) {
        setTimeout(() => setFlipped(true), 900)
      } else {
        setTimeout(() => {
          setCurrentQ(q => q + 1)
          setSelected(null)
        }, 900)
      }
    }
  }

  function handleRetry() {
    setSelected(null)
    setRetrying(false)
  }

  function handleReset() {
    setCurrentQ(0)
    setSelected(null)
    setFlipped(false)
    setRetrying(false)
  }

  return (
    <div className="px-5">
      <div style={{ perspective: '1200px' }} className="w-full">
        <div
          className="relative"
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.75s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* portrait on mobile, fixed-height landscape on desktop */}
          <div className="aspect-[4/5] md:aspect-auto md:h-[320px] max-w-xs mx-auto md:max-w-none relative">
          {/* ── FRONT — quiz ── */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col"
            style={{
              backfaceVisibility: 'hidden',
              background: 'linear-gradient(160deg, #111827 0%, #0d0f1a 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
              {/* Header */}
              <div className="px-5 pt-5 pb-3 border-b border-white/5">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[#e53935] text-lg">🎮</span>
                  <h3 className="text-sm font-extrabold text-white tracking-tight uppercase">{title}</h3>
                </div>
                {subtitle && <p className="text-xs text-white/30">{subtitle}</p>}
              </div>

              {/* Progress dots */}
              {total > 1 && (
                <div className="flex gap-1.5 px-5 pt-3">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className="h-1 rounded-full flex-1 transition-all duration-300"
                      style={{ background: i < currentQ ? '#e53935' : i === currentQ ? 'rgba(229,57,53,0.5)' : 'rgba(255,255,255,0.1)' }}
                    />
                  ))}
                </div>
              )}

              {/* Question */}
              <div className="flex-1 flex flex-col justify-center px-5 py-4 gap-4">
                <p className="text-base font-bold text-white leading-snug">
                  {question?.question}
                </p>

                {/* Answers */}
                <div className="flex flex-col gap-2.5">
                  {question?.answers.map((ans, idx) => {
                    let bg = 'rgba(255,255,255,0.05)'
                    let border = 'rgba(255,255,255,0.08)'
                    let textColor = 'rgba(255,255,255,0.75)'

                    if (selected !== null) {
                      if (idx === selected && ans.correct) {
                        bg = 'rgba(34,197,94,0.15)'
                        border = '#22c55e'
                        textColor = '#22c55e'
                      } else if (idx === selected && !ans.correct) {
                        bg = 'rgba(239,68,68,0.15)'
                        border = '#ef4444'
                        textColor = '#ef4444'
                      } else if (ans.correct) {
                        bg = 'rgba(34,197,94,0.08)'
                        border = 'rgba(34,197,94,0.3)'
                        textColor = 'rgba(34,197,94,0.7)'
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={selected !== null}
                        className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                        style={{
                          background: bg,
                          border: `1px solid ${border}`,
                          color: textColor,
                          cursor: selected !== null ? 'default' : 'pointer',
                        }}
                      >
                        <span className="font-bold mr-2 opacity-50">{String.fromCharCode(65 + idx)}.</span>
                        {ans.text}
                      </button>
                    )
                  })}
                </div>

                {/* Feedback */}
                {selected !== null && !isCorrect && (
                  <button
                    onClick={handleRetry}
                    className="mt-1 text-xs font-semibold text-white/40 hover:text-white/70 transition underline underline-offset-2"
                  >
                    Probeer opnieuw
                  </button>
                )}
                {selected !== null && isCorrect && currentQ + 1 < total && (
                  <p className="text-xs text-[#22c55e] font-semibold text-center animate-pulse">
                    Goed! Volgende vraag...
                  </p>
                )}
                {selected !== null && isCorrect && currentQ + 1 >= total && (
                  <p className="text-xs text-[#22c55e] font-semibold text-center animate-pulse">
                    Alle vragen goed! 🎉
                  </p>
                )}
              </div>

              {/* Footer */}
              <div className="px-5 pb-4 text-xs text-white/20 text-center">
                Vraag {currentQ + 1} van {total}
              </div>
            </div>

          {/* ── BACK — affiliate ── */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            {flipImageUrl ? (
              <Image src={flipImageUrl} alt={flipTitle ?? 'Aanbieding'} fill style={{ objectFit: 'cover' }} />
            ) : (
              <div style={{ background: 'linear-gradient(160deg, #1e0a3c 0%, #0a1628 100%)', width: '100%', height: '100%' }} />
            )}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)' }} />

            <div className="absolute inset-0 flex flex-col justify-end p-5 gap-3">
              {flipBadge && (
                <span className="self-start bg-[#e53935] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md tracking-widest uppercase">
                  {flipBadge}
                </span>
              )}
              {flipTitle && (
                <h3 className="text-lg font-extrabold text-white leading-snug">{flipTitle}</h3>
              )}
              {flipSubtext && (
                <p className="text-xs text-white/60 leading-relaxed">{flipSubtext}</p>
              )}
              {flipCtaText && flipCtaLink && (
                <a
                  href={flipCtaLink}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center justify-center gap-2 bg-[#e53935] hover:bg-[#c62828] text-white text-sm font-bold py-3 rounded-xl transition shadow-lg"
                >
                  {flipCtaText}
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 7h10M8 3l4 4-4 4" />
                  </svg>
                </a>
              )}
              <button
                onClick={handleReset}
                className="text-xs text-white/25 hover:text-white/50 transition text-center"
              >
                Quiz opnieuw spelen
              </button>
            </div>
          </div>
          </div>{/* closes aspect/height wrapper */}
        </div>{/* closes rotatable inner */}
      </div>{/* closes perspective */}
    </div>
  )
}
