import { homeImages } from '../data/siteData'

function HomeImage({ src }) {
  return (
    <div className="home-grid-item">
      <img src={`/${src}`} alt="" loading="lazy" />
    </div>
  )
}

export default function Home() {
  return (
    <>
      <div className="home-hero">
        <h1>Ted Dawson Studio</h1>
        <p className="home-tagline">
          Through a singular blend of graphic design and illustration, Ted
          provides creative solutions that are personal, unique and impactful.
        </p>
      </div>
      <div className="home-recent">
        <p className="home-recent-title">Recent Work</p>
        <div className="home-grid">
          {homeImages.map((src) => (
            <HomeImage key={src} src={src} />
          ))}
        </div>
      </div>
    </>
  )
}
