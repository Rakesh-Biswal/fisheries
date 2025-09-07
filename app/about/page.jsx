"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Shield, Leaf, TrendingUp } from "lucide-react";
import Link from "next/link";


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
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">About Our Platform</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto text-pretty">
              Empowering farmers with modern fisheries solutions since 2020
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We believe every farmer deserves access to modern, reliable fisheries solutions. Our government-backed
                platform connects farmers with expert services, quality equipment, and ongoing support to ensure
                successful aquaculture projects.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                From pond construction to fish stocking, we provide comprehensive support that helps farmers build
                sustainable, profitable fisheries operations.
              </p>
              <Link href="/signup">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                  Join Our Community
                </Button>
              </Link>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <img
                src="/farmers-working-with-fish-ponds-aquaculture.jpg"
                alt="Farmers working with fish ponds"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600">Making a difference in farmers' lives across the region</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto bg-blue-100 p-3 rounded-full w-fit mb-4">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl text-gray-900">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 text-base">{value.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to your success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-32 h-32 rounded-full object-cover mx-auto"
                    />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{member.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 text-green-100">
            Join thousands of farmers who trust our platform for their fisheries needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg">
                Get Started Today
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg bg-transparent"
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