"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const schemes = [
  {
    id: 1,
    name: "Central Sector Scheme (CSS)",
    description:
      "Up to 40% subsidy on fish farming infrastructure and equipment. Perfect for establishing your pond setup.",
    subsidy: "40%",
    amount: "₹5-10 Lakhs",
  },
  {
    id: 2,
    name: "Pradhan Mantri Matsya Sampada Yojana (PMMSY)",
    description: "Comprehensive scheme with subsidies, loans, and training support for modern fish farming techniques.",
    subsidy: "35-50%",
    amount: "₹15-50 Lakhs",
  },
  {
    id: 3,
    name: "State Fisheries Development Board Scheme",
    description:
      "Odisha-specific subsidies and grants for fish farmers with financial assistance and free training programs.",
    subsidy: "45%",
    amount: "₹3-8 Lakhs",
  },
  {
    id: 4,
    name: "Credit Guarantee Fund Scheme",
    description: "Simplified loans with government guarantee. No collateral required for loans up to a certain limit.",
    subsidy: "Interest subsidy",
    amount: "₹10-25 Lakhs",
  },
]

export function SchemesSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
      }
    })

    const element = document.getElementById("schemes-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const handleViewAll = () => {
    alert("View all schemes feature will redirect to the schemes page")
  }

  return (
    <section id="schemes-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">Government Schemes</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Unlock government subsidies and funding opportunities designed to make fish farming accessible and
              profitable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {schemes.slice(0, 4).map((scheme, index) => (
              <div
                key={scheme.id}
                className="group p-8 rounded-xl bg-background border-2 border-border hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{scheme.name}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{scheme.subsidy}</p>
                    <p className="text-xs text-muted-foreground">Subsidy</p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">{scheme.description}</p>

                <div className="pt-6 border-t border-border">
                  <p className="text-sm text-primary font-semibold">Maximum Amount: {scheme.amount}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={handleViewAll}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-base flex items-center gap-2 group mx-auto"
            >
              View All Schemes
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
