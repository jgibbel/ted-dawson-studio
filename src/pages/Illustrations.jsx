import ImageGrid from '../components/ImageGrid'
import { illustrationImages } from '../data/siteData'

export default function Illustrations() {
  return (
    <div className="container">
      <h1 className="page-title">Illustrations</h1>
      <ImageGrid images={illustrationImages} />
    </div>
  )
}
