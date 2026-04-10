import { useState } from 'react'
import Lightbox from './Lightbox'

function LazyImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <img
      src={src}
      alt={alt}
      className={loaded ? 'loaded' : ''}
      onLoad={() => setLoaded(true)}
      loading="lazy"
    />
  )
}

export default function ImageGrid({ images, tight = false, uniform = false }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const prev = () =>
    setLightboxIndex((i) => (i - 1 + images.length) % images.length)
  const next = () =>
    setLightboxIndex((i) => (i + 1) % images.length)

  return (
    <>
      <div className={`image-grid${tight ? ' tight' : ''}${uniform ? ' uniform' : ''}`}>
        {images.map((src, i) => (
          <div
            key={src}
            className="image-grid-item"
            onClick={() => setLightboxIndex(i)}
          >
            <LazyImage src={`${import.meta.env.BASE_URL}${src}`} alt="" />
          </div>
        ))}
      </div>
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  )
}
