"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageToggle } from "./language-toggle"
import { useLanguage } from "@/contexts/language-context"
import { Menu, X, Fish } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-blue-900 via-blue-800 to-teal-900 text-white shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-teal-400 to-blue-500 shadow-md">
              <Fish className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="block text-lg font-bold">Fisheries</span>
              <span className="block text-xs text-blue-200">
                Business Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link
              href="/"
              className="relative text-sm font-medium px-3 py-2 hover:text-white transition-all duration-300 group"
            >
              {t("home")}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/explore"
              className="relative text-sm font-medium px-3 py-2 hover:text-white transition-all duration-300 group"
            >
              {t("exploreSchemes")}
              <span className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300 -z-10"></span>
            </Link>
            <Link
              href="/about"
              className="relative text-sm font-medium px-3 py-2 hover:text-white transition-all duration-300 group"
            >
              {t("aboutUs")}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/services"
              className="relative text-sm font-medium px-3 py-2 hover:text-white transition-all duration-300 group"
            >
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/contact"
              className="relative text-sm font-medium px-3 py-2 hover:text-white transition-all duration-300 group"
            >
              {t("contact")}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Right side buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <LanguageToggle />
            <Link href="/signin">
              <Button
                variant="outline"
                size="sm"
                className="border-blue-300 text-white hover:bg-blue-700/30"
              >
                {t("signIn")}
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="sm"
                className="bg-gradient-to-r from-teal-500 to-blue-600 text-white border-0 hover:from-teal-600 hover:to-blue-700 shadow-md"
              >
                {t("getStarted")}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-blue-800/40 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-blue-700 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-1">
              <Link
                href="/"
                className="px-4 py-3 text-base font-medium hover:bg-blue-800/40 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("home")}
              </Link>
              <Link
                href="/explore"
                className="px-4 py-3 text-base font-medium hover:bg-blue-800/40 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("exploreSchemes")}
              </Link>
              <Link
                href="/about"
                className="px-4 py-3 text-base font-medium hover:bg-blue-800/40 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("aboutUs")}
              </Link>
              <Link
                href="/services"
                className="px-4 py-3 text-base font-medium hover:bg-blue-800/40 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="px-4 py-3 text-base font-medium hover:bg-blue-800/40 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("contact")}
              </Link>

              <div className="flex flex-col space-y-3 pt-4 px-3">
                <LanguageToggle />
                <Link href="/signin" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full h-12 text-base bg-transparent text-white border-blue-300 hover:bg-blue-700/30">
                    {t("signIn")}
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full h-12 text-base bg-gradient-to-r from-teal-500 to-blue-600 text-white border-0 hover:from-teal-600 hover:to-blue-700">
                    {t("getStarted")}
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
