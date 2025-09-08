import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { SchemeOverview } from '@/components/scheme-overview'
import { Footer } from '@/components/footer'
import {Loa}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <SchemeOverview />
      </main>
      <Footer />
    </div>
  )
}