import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useNavigationType, Link } from 'react-router-dom'
import ImageGrid from '../components/ImageGrid'
import { books, publications, illustrationImages, identityImages, clients } from '../data/siteData'

function Section({ id, title, children }) {
  return (
    <section id={id} className="one-pager-section">
      <div className="container">
        <h2 className="page-title">{title}</h2>
        {children}
      </div>
    </section>
  )
}

const VIEWBOX_H = 110
const THRESHOLD = 0.5   // image bottom triggers fall when it crosses this fraction of vh

function useScrollEffect(heroRef, titleRef, onNavOpacity, restoringScroll) {
  const [s, setS] = useState(() =>
    // If restoring a saved scroll position the page will land in phase 3.
    // Start there immediately so sections don't jump after the first paint.
    restoringScroll
      ? { svgStyle: { position: 'relative', opacity: 1 }, spacerH: 0, clipYSvg: 0, landed: true }
      : { svgStyle: { position: 'fixed', top: -400, left: 0, opacity: 0 }, spacerH: 0, clipYSvg: VIEWBOX_H, landed: false }
  )

  useEffect(() => {
    const update = () => {
      const heroEl  = heroRef.current
      const titleEl = titleRef.current
      if (!heroEl || !titleEl) return

      const heroH   = heroEl.offsetHeight
      const titleH  = titleEl.getBoundingClientRect().height || (window.innerWidth * VIEWBOX_H / 1000)
      const vh      = window.innerHeight
      const scrollY = window.scrollY

      // Nav fades in over the first 20% of the image height
      onNavOpacity?.(Math.min(scrollY / (heroH * 0.2), 1))
      // Text fades in slower — by the time image bottom is ~10% above bottom of screen
      const fadeEnd = Math.max(heroH - vh * 0.9, heroH * 0.2)

      // Scroll positions that bound the three phases
      const fixedTop    = THRESHOLD * vh - titleH
      const startScroll = Math.max(heroH - THRESHOLD * vh, 0)
      const endScroll   = heroH - fixedTop

      if (scrollY <= startScroll) {
        // Phase 1: title tracks image bottom, all white
        setS({
          svgStyle: {
            position: 'fixed',
            top: heroH - scrollY - titleH,
            left: 0,
            opacity: Math.min(scrollY / fadeEnd, 1),
          },
          spacerH: 0,
          clipYSvg: VIEWBOX_H,
          landed: false,
        })
      } else if (scrollY < endScroll) {
        // Phase 2: title fixed, image slides away, split colour advances upward
        const progress = (scrollY - startScroll) / (endScroll - startScroll)
        // Image bottom relative to SVG top, mapped to SVG coordinate space
        const imageBotVP = heroH - scrollY            // image bottom in viewport px
        const clipYPx    = imageBotVP - fixedTop      // px from SVG top
        const clipYSvg   = Math.max(0, Math.min(VIEWBOX_H, (clipYPx / titleH) * VIEWBOX_H))

        setS({
          svgStyle: { position: 'fixed', top: fixedTop, left: 0, opacity: 1 },
          spacerH: progress * titleH,
          clipYSvg,
          landed: false,
        })
      } else {
        // Phase 3: landed in document flow, all black
        setS({
          svgStyle: { position: 'relative', opacity: 1 },
          spacerH: 0,
          clipYSvg: 0,
          landed: true,
        })
      }
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [heroRef, titleRef, onNavOpacity])

  return s
}

export default function OnePager({ onNavOpacity }) {
  const { hash } = useLocation()
  const navType  = useNavigationType()
  const heroRef  = useRef(null)
  const titleRef = useRef(null)
  // Peek at sessionStorage once at mount — non-null means we're restoring a back-nav position
  const [restoringScroll] = useState(() => sessionStorage.getItem('onepager-scroll') !== null)
  const { svgStyle, spacerH, clipYSvg, landed } = useScrollEffect(heroRef, titleRef, onNavOpacity, restoringScroll)

  // On back-navigation, restore the exact scroll position saved before leaving
  useLayoutEffect(() => {
    if (navType !== 'POP') return
    const saved = sessionStorage.getItem('onepager-scroll')
    if (saved !== null) {
      window.scrollTo({ top: parseInt(saved, 10), behavior: 'instant' })
      sessionStorage.removeItem('onepager-scroll')
    }
  }, [navType])

  // Hash-based scroll for nav link clicks
  useEffect(() => {
    if (navType === 'POP') return
    if (hash) {
      const el = document.querySelector(hash)
      if (el) el.scrollIntoView({ behavior: 'instant' })
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [hash, navType])

  const textProps = {
    x: '0',
    y: '95',
    textLength: '1000',
    lengthAdjust: 'spacingAndGlyphs',
    fontFamily: "'Syne', 'Arial Black', Arial, sans-serif",
    fontWeight: '800',
    fontSize: '90',
  }

  return (
    <>
      <div id="home" className="hero-full" ref={heroRef}>
        <img
          src={`${import.meta.env.BASE_URL}assets/IMG_3883+BTrevor+16x20-df8feef6.png`}
          className="hero-bg-img"
          alt=""
        />
      </div>

      {/* Spacer grows to push illustrations down during fall; collapses once landed */}
      <div style={landed ? {} : { height: spacerH }}>
        <svg
          ref={titleRef}
          className="hero-title-svg"
          viewBox={`0 0 1000 ${VIEWBOX_H}`}
          preserveAspectRatio="none"
          style={svgStyle}
          aria-label="Ted Dawson Studio"
        >
          <defs>
            {/* White: everything above the image bottom edge */}
            <clipPath id="clip-white">
              <rect x="0" y="0" width="1000" height={clipYSvg} />
            </clipPath>
            {/* Black: everything below */}
            <clipPath id="clip-black">
              <rect x="0" y={clipYSvg} width="1000" height={VIEWBOX_H - clipYSvg} />
            </clipPath>
          </defs>
          <text {...textProps} fill="white" clipPath="url(#clip-white)">
            Ted Dawson Studio
          </text>
          <text {...textProps} fill="black" clipPath="url(#clip-black)">
            Ted Dawson Studio
          </text>
        </svg>
      </div>

      <Section id="illustrations" title="Illustrations">
        <ImageGrid images={illustrationImages} />
      </Section>

      <Section id="childrens-books" title="Children's Books">
        <div className="index-grid">
          {books.map((book) => (
            <Link key={book.slug} to={`/${book.slug}`} className="index-card"
              onClick={() => sessionStorage.setItem('onepager-scroll', window.scrollY)}>
              <div className="index-card-image">
                <img src={`${import.meta.env.BASE_URL}${book.cover}`} alt={book.title} loading="lazy" />
              </div>
              <p className="index-card-title">{book.title}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section id="publications" title="Publications">
        <div className="index-grid">
          {publications.map((pub) => (
            <Link key={pub.slug} to={`/${pub.slug}`} className="index-card"
              onClick={() => sessionStorage.setItem('onepager-scroll', window.scrollY)}>
              <div className="index-card-image">
                <img src={`${import.meta.env.BASE_URL}${pub.cover}`} alt={pub.title} loading="lazy" />
              </div>
              <p className="index-card-title">{pub.title}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section id="identities" title="Identities">
        <ImageGrid images={identityImages} uniform />
      </Section>

      <Section id="about" title="About">
        <div>
            <div className="about-bio">
              <p>
                With a unique combination of creative talent and personal
                service, Ted Dawson Studio has been working with a wide range of
                clients in the arts, education, social services, business, and
                religious institutions for over 25 years. Blending graphic
                design and illustration skills, Ted produces original solutions
                for his clients' diverse project needs.
              </p>
              <p>
                Ted Dawson moved to New York City to pursue a graduate degree in
                philosophy at the New School for Social Research after
                graduating from Marquette University with degrees in English and
                Philosophy. His love of painting and drawing soon led him to the
                Art Students League where he studied with Norman Lewis. He began
                studying graphic design and illustration at The School of Visual
                Arts and soon started working as an art director, most notably
                for Braniff Airlines. With accounts in the not-for-profit world
                accumulating, he opened Ted Dawson Studio. Performing arts,
                not-for-profit and public relations clients soon followed.
              </p>
              <p>
                Ted is a long standing board member at Bailey House, which
                houses homeless people with HIV/AIDS, and is founding member of
                its annual auction. He has also served as moderator on the board
                of directors of historic Judson Memorial Church in Greenwich
                Village. He considers himself fortunate to be able to combine a
                love of art and design with a strong commitment to public
                service.
              </p>
              <p>He lives with his husband, Bart Boehlert, in New York City.</p>
            </div>
            <div className="about-clients">
              <h2>Clients</h2>
              <ul className="clients-list">
                {clients.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
        </div>
      </Section>

      <Section id="contact" title="Contact">
        <div className="contact-info">
          <p>138 West 15th Street, Apt. 3</p>
          <p>New York, NY 10011</p>
          <p style={{ marginTop: '1rem' }}>646 221 5316</p>
          <p>
            <a href="mailto:tdstudio@rcn.com">tdstudio@rcn.com</a>
          </p>
        </div>
      </Section>
    </>
  )
}
