import { useEffect, useCallback, useRef, useState } from 'react'

export default function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const [closing, setClosing] = useState(false)
  const [direction, setDirection] = useState('next')
  const mouseDownPos = useRef(null)
  const touchStartX = useRef(null)

  const handlePrev = () => { setDirection('prev'); onPrev() }
  const handleNext = () => { setDirection('next'); onNext() }

  const handleClose = useCallback(() => {
    setClosing(true)
    setTimeout(onClose, 200)
  }, [onClose])

  const handleKey = useCallback(
    (e) => {
      if (e.key === 'Escape') handleClose()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    },
    [handleClose, onPrev, onNext]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  // Swipe to navigate
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > 50) delta < 0 ? handleNext() : handlePrev()
    else handleClose()
    touchStartX.current = null
  }

  if (index === null || index === undefined) return null

  return (
    <div
      className={`lightbox-overlay${closing ? ' lightbox-overlay--closing' : ''}`}
      onMouseDown={(e) => { mouseDownPos.current = { x: e.clientX, y: e.clientY } }}
      onClick={(e) => {
        if (!mouseDownPos.current) return
        const dist = Math.hypot(e.clientX - mouseDownPos.current.x, e.clientY - mouseDownPos.current.y)
        mouseDownPos.current = null
        if (dist < 5) handleClose()
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="lightbox-content"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        <img key={index} src={`/${images[index]}`} alt="" className={`lightbox-img lightbox-img--${direction}`} />
      </div>

      <button
        className="lightbox-close"
        onClick={(e) => { e.stopPropagation(); handleClose() }}
        onTouchEnd={(e) => e.stopPropagation()}
        aria-label="Close"
      >
        ×
      </button>

      {images.length > 1 && (
        <>
          <button
            className="lightbox-prev"
            onClick={(e) => { e.stopPropagation(); handlePrev() }}
            onTouchEnd={(e) => e.stopPropagation()}
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            className="lightbox-next"
            onClick={(e) => { e.stopPropagation(); handleNext() }}
            onTouchEnd={(e) => e.stopPropagation()}
            aria-label="Next"
          >
            ›
          </button>
        </>
      )}
    </div>
  )
}
