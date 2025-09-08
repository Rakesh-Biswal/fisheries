"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Fish, Waves } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-teal-900 text-white shadow-2xl overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-white rounded-full animate-float-3d-small"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-white rounded-full animate-float-3d-medium"></div>
        <Waves className="absolute top-2 right-8 w-16 h-16 animate-wave-bob-3d" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3 transform hover:scale-105 transition-all duration-300 hover:rotate-1">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full flex items-center justify-center shadow-lg transform hover:rotate-y-12 transition-transform duration-500">
                <Fish className="w-6 h-6 text-white animate-fish-wiggle" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-teal-300 rounded-full animate-ping-3d"></div>
            </div>
            <div className="transform hover:translate-z-2 transition-transform duration-300">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Fisheries
              </h1>
              <p className="text-xs text-blue-200 -mt-1">Business Solutions</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {["Home", "Explore", "About", "Services", "Contact"].map((item, index) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="relative px-3 py-2 text-sm font-medium text-blue-100 hover:text-white transition-all duration-300 transform hover:scale-110 hover:rotate-1 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="relative z-10">{item}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300 -z-10"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-teal-400 group-hover:w-full transition-all duration-300"></div>
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="!bg-gradient-to-r !from-teal-500 !to-blue-600 !text-white !border-0 hover:!from-teal-600 hover:!to-blue-700 transform hover:scale-105 hover:rotate-1 transition-all duration-300 shadow-lg hover:shadow-xl">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg bg-blue-800/50 hover:bg-blue-700/50 transform hover:scale-110 transition-all duration-300"
          >
            {isMenuOpen ? <X className="w-6 h-6 animate-spin" /> : <Menu className="w-6 h-6 animate-pulse" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-500 transform ${
            isMenuOpen ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-4"
          } overflow-hidden`}
        >
          <nav className="py-4 space-y-2">
            {["Home", "Explore", "About", "Services", "Contact"].map((item, index) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="block px-4 py-3 text-blue-100 hover:text-white hover:bg-blue-800/50 rounded-lg transition-all duration-300 transform hover:translate-x-2 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="px-4 pt-4">
              <Button className="w-full !bg-gradient-to-r !from-teal-500 !to-blue-600 !text-white !border-0 hover:!from-teal-600 hover:!to-blue-700 transform hover:scale-105 transition-all duration-300">
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-particle-3d"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${8 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </header>
  )
}
