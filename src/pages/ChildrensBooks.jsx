import { Link } from 'react-router-dom'
import { books } from '../data/siteData'

export default function ChildrensBooks() {
  return (
    <div className="container">
      <h1 className="page-title">Children's Books</h1>
      <div className="index-grid">
        {books.map((book) => (
          <Link key={book.slug} to={`/${book.slug}`} className="index-card">
            <div className="index-card-image">
              <img src={`/${book.cover}`} alt={book.title} loading="lazy" />
            </div>
            <p className="index-card-title">{book.title}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
