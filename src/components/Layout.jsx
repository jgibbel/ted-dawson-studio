import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { hash: 'illustrations', label: 'Illustrations' },
  { hash: 'childrens-books', label: "Children's Books" },
  { hash: 'publications', label: 'Publications' },
  { hash: 'identities', label: 'Identities' },
  { hash: 'about', label: 'About' },
  { hash: 'contact', label: 'Contact' },
]

export default function Layout({ children, navOpacity }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { hash, pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <>
      <nav
        className="nav"
        style={isHome && navOpacity !== undefined ? {
          opacity: navOpacity,
          pointerEvents: navOpacity < 0.05 ? 'none' : 'auto',
        } : undefined}
      >
        <div className="nav-inner">
          <Link to="/" className="nav-logo" onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'instant' }) }}>
            <img src="/assets/Ted+portrait-33746941.jpg" alt="Ted Dawson Studio" className="nav-logo-img" />
          </Link>
          <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
            {navLinks.map(({ hash: id, label }) => (
              <li key={id}>
                <Link
                  to={`/#${id}`}
                  className={hash === `#${id}` ? 'active' : ''}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            className="nav-menu-btn"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
      <main className={`page${isHome ? '' : ' page--offset'}`}>{children}</main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Ted Dawson Studio · New York City</p>
      </footer>
    </>
  )
}
