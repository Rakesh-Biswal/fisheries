"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Shield, Leaf, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Farmer-First Approach",
      description: "Every decision we make puts farmers and their success at the center of our mission.",
    },
    {
      icon: Shield,
      title: "Trust & Reliability",
      description: "Government-backed platform ensuring secure, reliable, and transparent services.",
    },
    {
      icon: Leaf,
      title: "Sustainable Practices",
      description: "Promoting environmentally responsible fisheries that benefit both farmers and nature.",
    },
    {
      icon: TrendingUp,
      title: "Growth & Innovation",
      description: "Continuously improving our services with modern technology and best practices.",
    },
  ]

  const team = [
    {
      name: "Dr. Pramod Biswal",
      role: "Director of Fisheries Development",
      experience: "15+ years in aquaculture research",
      image: "/professional-woman-fisheries-expert.jpg",
    },
    {
      name: "Rakesh Biswal",
      role: "Senior Agricultural Advisor",
      experience: "12+ years supporting farmers",
      image: "/professional-man-agricultural-advisor.jpg",
    },
    {
      name: "Soumya Ranjan Praharaj",
      role: "Technical Support Lead",
      experience: "10+ years in fish farming technology",
      image: "/professional-woman-technical-expert.jpg",
    },
  ]

  const stats = [
    { number: "2,500+", label: "Farmers Served" },
    { number: "1,200+", label: "Projects Completed" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "Support Available" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full animate-float blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-teal-200/20 rounded-full animate-float-delayed blur-xl"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-green-200/20 rounded-full animate-float blur-xl"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-blue-300/20 rounded-full animate-float-delayed blur-xl"></div>
      </div>

      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white py-24 perspective-1000 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-teal-600/20 animate-gradient-x"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transform-gpu">
          <div className="text-center transform hover:scale-105 transition-all duration-700 hover:rotate-x-2">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-balance transform hover:translate-z-4 transition-all duration-500 bg-gradient-to-r from-white via-blue-100 to-teal-100 bg-clip-text text-transparent animate-pulse-slow">
              About Our Platform
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto text-pretty transform hover:translate-z-2 transition-all duration-500 leading-relaxed">
              Empowering farmers with modern fisheries solutions since 2020
            </p>
            <div className="transform hover:scale-110 hover:rotate-y-6 transition-all duration-500 hover:translate-z-4">
              <div className="inline-block p-1 bg-gradient-to-r from-white/20 to-teal-200/20 rounded-full backdrop-blur-sm">
                <div className="bg-white/10 rounded-full px-8 py-3 backdrop-blur-md">
                  <span className="text-lg font-semibold">Trusted by 2,500+ Farmers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="transform hover:translate-x-2 hover:rotate-y-3 transition-all duration-700 hover:translate-z-4 preserve-3d">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                Our Mission
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed transform hover:translate-x-1 transition-all duration-300">
                  We believe every farmer deserves access to modern, reliable fisheries solutions. Our government-backed
                  platform connects farmers with expert services, quality equipment, and ongoing support to ensure
                  successful aquaculture projects.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed transform hover:translate-x-1 transition-all duration-300 delay-100">
                  From pond construction to fish stocking, we provide comprehensive support that helps farmers build
                  sustainable, profitable fisheries operations.
                </p>
              </div>
              <div className="mt-10 transform hover:scale-110 hover:rotate-y-6 transition-all duration-500">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transform hover:translate-y-1 transition-all duration-300"
                  >
                    Join Our Community
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-teal-400 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500 transform group-hover:scale-110"></div>
              <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-2xl transform group-hover:scale-105 group-hover:rotate-y-6 transition-all duration-700 hover:translate-z-8 preserve-3d">
                <img
                  src="/farmers-working-with-fish-ponds-aquaculture.jpg"
                  alt="Farmers working with fish ponds"
                  className="w-full h-72 object-cover rounded-xl shadow-lg transform group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-gray-50 via-blue-50 to-teal-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-teal-100/20 animate-gradient-x"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 transform hover:scale-105 transition-all duration-500">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600">Making a difference in farmers' lives across the region</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group transform hover:scale-110 hover:rotate-y-12 transition-all duration-500 hover:translate-z-8 preserve-3d"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-teal-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500 transform group-hover:scale-125"></div>
                  <div className="relative bg-white rounded-2xl p-8 shadow-xl group-hover:shadow-2xl transform group-hover:translate-y-2 transition-all duration-300">
                    <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-3 transform group-hover:scale-125 transition-all duration-300">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 font-medium transform group-hover:translate-y-1 transition-all duration-300">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 transform hover:scale-105 transition-all duration-500">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card
                  key={index}
                  className="text-center group hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:rotate-y-12 hover:translate-z-8 preserve-3d border-0 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-teal-400/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <CardHeader className="relative">
                    <div className="mx-auto bg-gradient-to-r from-blue-100 to-teal-100 p-4 rounded-full w-fit mb-6 shadow-lg transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:translate-z-4">
                      <IconComponent className="h-10 w-10 text-blue-600 transform group-hover:rotate-12 transition-all duration-300" />
                    </div>
                    <CardTitle className="text-xl text-gray-900 transform group-hover:translate-y-1 transition-all duration-300">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <CardDescription className="text-gray-600 text-base leading-relaxed transform group-hover:translate-y-1 transition-all duration-300">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-gray-50 via-blue-50 to-teal-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-teal-100/20 animate-gradient-x"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 transform hover:scale-105 transition-all duration-500">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to your success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {team.map((member, index) => (
              <Card
                key={index}
                className="text-center group hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:rotate-y-12 hover:translate-z-8 preserve-3d border-0 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-teal-400/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <CardHeader className="relative">
                  <div className="mx-auto mb-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-all duration-500 transform group-hover:scale-125"></div>
                    <img
                      src={member.image || "/placeholder.svg?height=150&width=150&query=professional fisheries expert"}
                      alt={member.name}
                      className="relative w-36 h-36 rounded-full object-cover mx-auto shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border-4 border-white"
                    />
                  </div>
                  <CardTitle className="text-xl text-gray-900 transform group-hover:translate-y-1 transition-all duration-300">
                    {member.name}
                  </CardTitle>
                  <CardDescription className="text-blue-600 font-medium text-lg transform group-hover:translate-y-1 transition-all duration-300">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <p className="text-gray-600 transform group-hover:translate-y-1 transition-all duration-300">
                    {member.experience}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-green-600 via-teal-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 animate-gradient-x"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transform hover:scale-105 transition-all duration-500">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 transform hover:translate-z-4 transition-all duration-500">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-12 text-green-100 leading-relaxed transform hover:translate-z-2 transition-all duration-500">
            Join thousands of farmers who trust our platform for their fisheries needs
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 px-10 py-5 text-lg shadow-2xl transform hover:scale-110 hover:rotate-y-6 hover:translate-z-4 transition-all duration-500 font-semibold"
              >
                Get Started Today
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-10 py-5 text-lg bg-transparent shadow-2xl transform hover:scale-110 hover:rotate-y-6 hover:translate-z-4 transition-all duration-500 font-semibold"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
