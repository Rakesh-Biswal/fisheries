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
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-600 text-white shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:scale-110 transition-transform">
              <Fish className="h-6 w-6 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-wide bg-gradient-to-r from-cyan-200 to-white bg-clip-text text-transparent">
              Fisheries Solution
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {[
              { href: "/", label: t("home") },
              { href: "/explore", label: t("exploreSchemes") },
              { href: "/about", label: t("aboutUs") },
              { href: "/contact", label: t("contact") },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium px-2 py-1 group"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <LanguageToggle />
            <Link href="/signin">
              <Button
                variant="outline"
                size="sm"
                className="border-cyan-300 text-white hover:bg-cyan-600/30 transition-colors"
              >
                {t("signIn")}
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="sm"
                className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white shadow-md transition-all"
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
          <div className="lg:hidden py-4 border-t border-blue-700 animate-in slide-in-from-top duration-300">
            <nav className="flex flex-col space-y-2">
              {[
                { href: "/", label: t("home") },
                { href: "/explore", label: t("exploreSchemes") },
                { href: "/about", label: t("aboutUs") },
                { href: "/contact", label: t("contact") },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-base font-medium rounded-md bg-gradient-to-r from-blue-800/30 to-cyan-700/30 hover:from-cyan-600/40 hover:to-blue-700/40 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="flex flex-col space-y-3 pt-4 px-3">
                <LanguageToggle />
                <Link href="/signin" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full h-12 text-base bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                    {t("signIn")}
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full h-12 text-base bg-gradient-to-r from-teal-400 to-blue-600 hover:from-teal-500 hover:to-blue-700 text-white">
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
