"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageToggle } from "./language-toggle"
import { useLanguage } from "@/contexts/language-context"
import { Menu, X, Fish, Waves } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-teal-900 text-white shadow-2xl overflow-hidden sticky top-0 z-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-white rounded-full animate-float-3d-small"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-white rounded-full animate-float-3d-medium"></div>
        <Waves className="absolute top-2 right-8 w-16 h-16 animate-wave-bob-3d" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 transform hover:scale-105 transition-all duration-300 hover:rotate-1"
          >
            <div className="relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full flex items-center justify-center shadow-lg transform hover:rotate-y-12 transition-transform duration-500">
                <Fish className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-fish-wiggle" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-teal-300 rounded-full animate-ping-3d"></div>
            </div>
            <div className="transform hover:translate-z-2 transition-transform duration-300">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                <span className="hidden sm:inline">Fisheries Solution</span>
                <span className="sm:hidden">Fisheries</span>
              </h1>
              <p className="text-xs text-blue-200 -mt-1 hidden sm:block">Business Solutions</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link
              href="/"
              className="relative px-3 py-2 text-sm font-medium text-blue-100 hover:text-white transition-all duration-300 transform hover:scale-110 hover:rotate-1 group"
            >
              <span className="relative z-10">{t("home")}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300 -z-10"></div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-teal-400 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link
              href="/explore"
              className="relative px-3 py-2 text-sm font-medium text-blue-100 hover:text-white transition-all duration-300 transform hover:scale-110 hover:rotate-1 group"
            >
              <span className="relative z-10">{t("exploreSchemes")}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300 -z-10"></div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-teal-400 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link
              href="/about"
              className="relative px-3 py-2 text-sm font-medium text-blue-100 hover:text-white transition-all duration-300 transform hover:scale-110 hover:rotate-1 group"
            >
              <span className="relative z-10">{t("aboutUs")}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300 -z-10"></div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-teal-400 group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link
              href="/contact"
              className="relative px-3 py-2 text-sm font-medium text-blue-100 hover:text-white transition-all duration-300 transform hover:scale-110 hover:rotate-1 group"
            >
              <span className="relative z-10">{t("contact")}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300 -z-10"></div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-teal-400 group-hover:w-full transition-all duration-300"></div>
            </Link>
          </nav>

          {/* Right side buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <LanguageToggle />
<Link href="/signin">
  <Button
    variant="outline"
    size="sm"
    className="!bg-blue-900/30 !border-blue-300 !text-blue-100 hover:!bg-blue-800/50 hover:!text-white transform hover:scale-105 transition-all duration-300"
  >
    {t("signIn")}
  </Button>
</Link>

            <Link href="/signup">
              <Button
                size="sm"
                className="!bg-gradient-to-r !from-teal-500 !to-blue-600 !text-white !border-0 hover:!from-teal-600 hover:!to-blue-700 transform hover:scale-105 hover:rotate-1 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {t("getStarted")}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg bg-blue-800/50 hover:bg-blue-700/50 transform hover:scale-110 transition-all duration-300"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6 animate-spin" /> : <Menu className="h-6 w-6 animate-pulse" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-500 transform ${
            isMenuOpen ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-4"
          } overflow-hidden`}
        >
          <nav className="py-4 space-y-2">
            <Link
              href="/"
              className="block px-4 py-3 text-blue-100 hover:text-white hover:bg-blue-800/50 rounded-lg transition-all duration-300 transform hover:translate-x-2 hover:scale-105"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("home")}
            </Link>
            <Link
              href="/explore"
              className="block px-4 py-3 text-blue-100 hover:text-white hover:bg-blue-800/50 rounded-lg transition-all duration-300 transform hover:translate-x-2 hover:scale-105"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("exploreSchemes")}
            </Link>
            <Link
              href="/about"
              className="block px-4 py-3 text-blue-100 hover:text-white hover:bg-blue-800/50 rounded-lg transition-all duration-300 transform hover:translate-x-2 hover:scale-105"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("aboutUs")}
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-3 text-blue-100 hover:text-white hover:bg-blue-800/50 rounded-lg transition-all duration-300 transform hover:translate-x-2 hover:scale-105"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("contact")}
            </Link>

            <div className="flex flex-col space-y-3 pt-4 px-4">
              <LanguageToggle />
              <Link href="/signin" onClick={() => setIsMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full h-12 text-base !bg-transparent !border-blue-300 !text-blue-100 hover:!bg-blue-800/50 hover:!text-white transform hover:scale-105 transition-all duration-300 bg-transparent"
                >
                  {t("signIn")}
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full h-12 text-base !bg-gradient-to-r !from-teal-500 !to-blue-600 !text-white !border-0 hover:!from-teal-600 hover:!to-blue-700 transform hover:scale-105 transition-all duration-300">
                  {t("getStarted")}
                </Button>
              </Link>
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
        left: `${Math.random() * 100}%`,             // ✅ string with %
        animationDuration: `${8 + Math.random() * 4}s`, // ✅ string with s
        animationDelay: `${Math.random() * 2}s`,     // ✅ string with s
      }}
    />
  ))}
</div>
</header>
  )
}
