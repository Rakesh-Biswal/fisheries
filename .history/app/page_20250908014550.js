"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { SchemeOverview } from "@/components/scheme-overview"
import { Footer } from "@/components/footer"
import { LoadingIntro } from "@/components/loading-intro"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  const handleLoadingComplete = () => {
    setIsLoading(false)
    // Small delay to allow for smooth transition
    setTimeout(() => setShowContent(true), 300)
  }

  if (isLoading) {
    return <LoadingIntro onComplete={handleLoadingComplete} />
  }

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ${showContent ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4"}`}
    >
      <Header />
      <main>
        <HeroSection />
        <SchemeOverview />
      </main>
      <Footer />
    </div>
  )
}
