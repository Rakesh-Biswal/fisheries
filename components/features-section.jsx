"use client"

import { useEffect, useState } from "react"

const features = [
  {
    icon: "💰",
    title: "Government Schemes",
    description:
      "Access subsidies and government funding specifically designed for fish farming entrepreneurs in India.",
  },
  {
    icon: "📚",
    title: "Expert Guidance",
    description:
      "Learn from experienced professionals who provide comprehensive training on fish farming best practices.",
  },
  {
    icon: "🏦",
    title: "Seed Funding",
    description: "Get financial support to establish your fish farm with easy loan approval and minimal documentation.",
  },
  {
    icon: "📋",
    title: "Complete Documentation",
    description: "We handle all legal paperwork, land verification, and compliance requirements for you.",
  },
  {
    icon: "🛒",
    title: "Guaranteed Market",
    description: "Direct buyback of your harvest. We ensure stable pricing and reliable market access always.",
  },
  {
    icon: "🎓",
    title: "Continuous Learning",
    description: "Access to updated resources, seasonal guidance, and industry insights to maximize your yield.",
  },
]

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
      }
    })

    const element = document.getElementById("features-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="features-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete end-to-end support for your fish farming venture with industry-leading solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-xl bg-muted/50 border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:-translate-y-2 hover:bg-background animate-in fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
