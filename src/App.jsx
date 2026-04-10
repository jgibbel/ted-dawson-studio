import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import OnePager from './pages/OnePager'
import Detail from './pages/Detail'

window.history.scrollRestoration = 'manual'

export default function App() {
  const [navOpacity, setNavOpacity] = useState(0)

  return (
    <BrowserRouter>
      <Layout navOpacity={navOpacity}>
        <Routes>
          <Route path="/" element={<OnePager onNavOpacity={setNavOpacity} />} />
          <Route path="/:slug" element={<Detail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
