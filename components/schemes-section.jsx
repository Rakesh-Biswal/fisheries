"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, FileCheck, IndianRupee, Award } from "lucide-react"

const schemes = [
  {
    id: 1,
    name: "Central Sector Scheme (CSS)",
    description: "Up to 40% subsidy on fish farming infrastructure and equipment. Ideal for establishing pond setups with modern equipment support.",
    subsidy: "40%",
    amount: "₹5-10 Lakhs",
    icon: Shield,
    color: "from-blue-600 to-blue-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
  },
  {
    id: 2,
    name: "Pradhan Mantri Matsya Sampada Yojana (PMMSY)",
    description: "Comprehensive central scheme providing 35-50% subsidies, low-interest loans, and technical training for modern aquaculture practices.",
    subsidy: "35-50%",
    amount: "₹15-50 Lakhs",
    icon: Award,
    color: "from-green-600 to-emerald-500",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
  },
  {
    id: 3,
    name: "State Fisheries Development Board Scheme",
    description: "Odisha-specific assistance offering 45% subsidy, grants, and free training programs for local fish farmers.",
    subsidy: "45%",
    amount: "₹3-8 Lakhs",
    icon: FileCheck,
    color: "from-purple-600 to-violet-500",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
  },
  {
    id: 4,
    name: "Credit Guarantee Fund Scheme",
    description: "Collateral-free loans with government guarantee and interest subsidies for fish farming businesses.",
    subsidy: "Interest Subsidy",
    amount: "₹10-25 Lakhs",
    icon: IndianRupee,
    color: "from-amber-600 to-yellow-500",
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
  },
]

export function SchemesSection() {
  const handleExplore = (schemeName) => {
    // In a real application, this would navigate to scheme details page
    const phoneNumber = "+919040626617"
    const message = encodeURIComponent(
      `Hello Fisheries Team,\n\nI'm interested in learning more about the ${schemeName} government scheme for fish farming. Could you please:\n1. Share detailed eligibility criteria\n2. Explain the application process\n3. Provide required documentation list\n4. Tell me about subsidy disbursement timeline\n\nThank you!`
    )
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <section id="schemes-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-medium text-gray-600">Government Supported</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Government Schemes & Subsidies
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Access government-backed financial support and subsidies designed specifically for fish farming entrepreneurs. 
            We help you navigate the application process for maximum benefits.
          </p>
        </div>

        {/* Scheme Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {schemes.map((scheme) => {
            const Icon = scheme.icon
            
            return (
              <div 
                key={scheme.id}
                className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                {/* Scheme Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    {/* Icon */}
                    <div className={`p-3 rounded-xl ${scheme.bgColor}`}>
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${scheme.color} flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    
                    {/* Subsidy Badge */}
                    <div className="text-right">
                      <div className={`inline-flex items-center ${scheme.textColor} font-bold text-xl`}>
                        {scheme.subsidy}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Government Subsidy</p>
                    </div>
                  </div>

                  {/* Scheme Name */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    {scheme.name}
                  </h3>

                  {/* Scheme Description */}
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {scheme.description}
                  </p>

                  {/* Funding Amount */}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-gray-700">Funding Range:</span>
                    <span className={`font-bold ${scheme.textColor}`}>{scheme.amount}</span>
                  </div>
                </div>

                {/* Action Section */}
                <div className="px-6 py-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Eligibility: Indian Citizen with Agricultural Land
                    </div>
                    <Button
                      onClick={() => handleExplore(scheme.name)}
                      variant="outline"
                      className={`rounded-full border ${scheme.textColor.replace('text-', 'border-')} ${scheme.textColor} hover:${scheme.bgColor} transition-colors`}
                    >
                      Explore
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional Information */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold text-gray-900 mb-2">100%</div>
              <p className="text-gray-600 text-sm">Application Success Rate</p>
            </div>
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold text-gray-900 mb-2">15 Days</div>
              <p className="text-gray-600 text-sm">Average Processing Time</p>
            </div>
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold text-gray-900 mb-2">Free</div>
              <p className="text-gray-600 text-sm">Documentation Support</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-gray-100 border border-blue-100 rounded-2xl p-8 max-w-3xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need Help Selecting the Right Scheme?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our experts will analyze your requirements and recommend the best-suited government scheme for your fish farming business.
            </p>
            <Button
              onClick={() => {
                const phoneNumber = "+919040626617"
                const message = encodeURIComponent(
                  "Hello Fisheries Team,\n\nI need help selecting the right government scheme for my fish farming business. Please schedule a consultation call to discuss:\n1. My land and investment capacity\n2. Available scheme options\n3. Required documentation\n\nThank you!"
                )
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
                window.open(whatsappUrl, '_blank')
              }}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-full px-8 py-6 text-base font-medium shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2 mx-auto group"
            >
              Schedule Free Consultation
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Note: All schemes are subject to government guidelines and eligibility criteria. We provide end-to-end support for application and approval process.
          </p>
        </div>
      </div>
    </section>
  )
}