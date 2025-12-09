"use client"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { FeaturesSection } from "@/components/features-section"
import { SchemesSection } from "@/components/schemes-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { WhyChooseUsSection } from "@/components/why-choose-us-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <SchemesSection />
        <WhyChooseUsSection />
        <AboutSection />
        <FeaturesSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
