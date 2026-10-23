import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Products = lazy(() => import('./pages/Products'))
const Industries = lazy(() => import('./pages/Industries'))
const Technology = lazy(() => import('./pages/Technology'))
const WhyUs = lazy(() => import('./pages/WhyUs'))
const Careers = lazy(() => import('./pages/Careers'))
const Insights = lazy(() => import('./pages/Insights'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="products" element={<Products />} />
            <Route path="industries" element={<Industries />} />
            <Route path="technology" element={<Technology />} />
            <Route path="why-us" element={<WhyUs />} />
            <Route path="careers" element={<Careers />} />
            <Route path="insights" element={<Insights />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
