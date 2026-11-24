import { ArrowLeft, ArrowRight } from "lucide-react"
import type { CSSProperties } from "react"

type FeaturedFrame = {
  id: string
  title: string
  subtitle: string
  code: string
  image: string
}

type FeaturedFrameCarouselProps = {
  frames: FeaturedFrame[]
  activeIndex: number
  durationMs: number
  isPreviewing: boolean
  onSelect: (index: number) => void
}

const visibleOffsets = [-2, -1, 0, 1, 2] as const

export function FeaturedFrameCarousel({ frames, activeIndex, durationMs, isPreviewing, onSelect }: FeaturedFrameCarouselProps) {
  const activeFrame = frames[activeIndex]

  if (!activeFrame || frames.length === 0) return null

  const selectOffset = (offset: number) => (activeIndex + offset + frames.length) % frames.length

  return (
    <div className="frame-carousel" role="group" aria-label="Featured poster carousel">
      <div className="frame-carousel-heading">
        <span className="frame-carousel-eyebrow">THE FRAME SELECTS</span>
        <div className="frame-carousel-navigation">
          <button type="button" className="frame-carousel-arrow" onClick={() => onSelect(selectOffset(-1))} aria-label="Previous featured poster">
            <ArrowLeft size={16} aria-hidden="true" />
          </button>
          <span className="frame-carousel-count" aria-live="polite">
            <strong>{String(activeIndex + 1).padStart(2, "0")}</strong>
            <span>/ {String(frames.length).padStart(2, "0")}</span>
          </span>
          <button type="button" className="frame-carousel-arrow" onClick={() => onSelect(selectOffset(1))} aria-label="Next featured poster">
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="frame-carousel-stage">
        {visibleOffsets.map(offset => {
          const index = selectOffset(offset)
          const frame = frames[index]
          const position = offset === 0 ? "center" : Math.abs(offset) === 1 ? "near" : "far"

          return (
            <button
              type="button"
              key={`${offset}-${frame.id}`}
              className={`frame-carousel-card frame-carousel-card--${position}`}
              onClick={() => onSelect(index)}
              aria-label={`Show ${frame.title}: ${frame.subtitle}`}
              aria-current={offset === 0 ? "true" : undefined}
            >
              <span key={frame.id} className="frame-carousel-art" style={{ backgroundImage: `linear-gradient(180deg, rgb(6 8 10 / 24%) 0%, rgb(6 8 10 / 18%) 48%, rgb(6 8 10 / 92%) 100%), url("${frame.image}")` }} />
              <span className="frame-carousel-copy">
                <small>{frame.code}</small>
                <strong>{frame.title}</strong>
              </span>
              {offset === 0 && isPreviewing && <span className="frame-carousel-preview"><i /> PLAYBACK // PREVIEW</span>}
            </button>
          )
        })}
      </div>

      <div className="frame-carousel-progress" aria-hidden="true">
        <span key={activeFrame.id} style={{ "--frame-duration": `${durationMs}ms` } as CSSProperties} />
      </div>
    </div>
  )
}
