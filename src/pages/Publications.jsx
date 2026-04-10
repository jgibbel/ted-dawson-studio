import { Link } from 'react-router-dom'
import { publications } from '../data/siteData'

export default function Publications() {
  return (
    <div className="container">
      <h1 className="page-title">Publications</h1>
      <div className="index-grid">
        {publications.map((pub) => (
          <Link key={pub.slug} to={`/${pub.slug}`} className="index-card">
            <div className="index-card-image">
              <img src={`/${pub.cover}`} alt={pub.title} loading="lazy" />
            </div>
            <p className="index-card-title">{pub.title}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
