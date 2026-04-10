import ImageGrid from '../components/ImageGrid'
import { identityImages } from '../data/siteData'

export default function Identities() {
  return (
    <div className="container">
      <h1 className="page-title">Identities</h1>
      <ImageGrid images={identityImages} tight />
    </div>
  )
}
