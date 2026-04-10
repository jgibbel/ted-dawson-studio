import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import OnePager from './pages/OnePager'
import Detail from './pages/Detail'

window.history.scrollRestoration = 'manual'

export default function App() {
  return (
    <BrowserRouter basename="/ted-dawson-studio">
      <Layout>
        <Routes>
          <Route path="/" element={<OnePager />} />
          <Route path="/:slug" element={<Detail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
