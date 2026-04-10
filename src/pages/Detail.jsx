import { useLayoutEffect } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { books, publications } from '../data/siteData'
import ImageGrid from '../components/ImageGrid'

export default function Detail() {
  const { pathname } = useLocation()

  useLayoutEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])
  const slug = pathname.replace(/^\//, '')

  const book = books.find((b) => b.slug === slug)
  const pub = publications.find((p) => p.slug === slug)
  const item = book || pub
  const backLabel = book ? "Children's Books" : 'Publications'

  if (!item) return <Navigate to="/" replace />

  return (
    <div className="container">
      <p style={{ marginBottom: '1.5rem' }}>
        <button
          onClick={() => window.history.back()}
          style={{
            fontSize: '0.75rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-muted)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            fontFamily: 'inherit',
          }}
        >
          ← {backLabel}
        </button>
      </p>
      <h1 className="page-title">{item.title}</h1>
      {(item.author || item.description) && (
        <div className="detail-description">
          {item.author && <p className="author">{item.author}</p>}
          {item.description && <p>{item.description}</p>}
        </div>
      )}
      <ImageGrid images={item.images} />
    </div>
  )
}
