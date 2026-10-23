import Seo from '../components/Seo'
import { Button, PageHero } from '../components/ui'

export default function NotFound() {
  return (
    <>
      <Seo path="/404" noindex title="Page not found | Balvirt" description="The page you are looking for does not exist." />
      <PageHero eyebrow="Error 404" title="This page drifted" highlight="out of orbit" subtitle="The page you are looking for may have moved or no longer exists.">
        <Button to="/">Back to home</Button>
        <Button to="/contact" variant="ghost">Contact us</Button>
      </PageHero>
    </>
  )
}
