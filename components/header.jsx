"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageToggle } from "./language-toggle"
import { useLanguage } from "@/contexts/language-context"
import { Menu, X, Fish, Waves, User, LogOut } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/api/auth/check")
      const data = await response.json()
      setIsAuthenticated(data.isAuthenticated)
    } catch (error) {
      console.error("Failed to check auth status:", error)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      // Call API to clear the cookie
      await fetch("/api/auth/signout", { method: "POST" })
      setIsAuthenticated(false)
      window.location.href = "/"
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-teal-900 text-white shadow-lg sticky top-0 z-50">
      {/* Simplified Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-24 h-24 bg-white rounded-full animate-pulse"></div>
        <Waves className="absolute top-2 right-8 w-12 h-12" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 transition-transform duration-200 hover:scale-105"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full flex items-center justify-center shadow-md">
              <Fish className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white">
                <span className="hidden sm:inline">Fisheries Solution</span>
                <span className="sm:hidden">Fisheries</span>
              </h1>
              <p className="text-xs text-blue-200 -mt-1 hidden sm:block">Business Solutions</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4">
            <Link
              href="/"
              className="px-3 py-2 text-sm font-medium text-blue-100 hover:text-white transition-colors duration-200 hover:bg-blue-800/30 rounded-md"
            >
              {t("home")}
            </Link>
            <Link
              href="/explore"
              className="px-3 py-2 text-sm font-medium text-blue-100 hover:text-white transition-colors duration-200 hover:bg-blue-800/30 rounded-md"
            >
              {t("exploreSchemes")}
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 text-sm font-medium text-blue-100 hover:text-white transition-colors duration-200 hover:bg-blue-800/30 rounded-md"
            >
              {t("aboutUs")}
            </Link>
            <Link
              href="/contact"
              className="px-3 py-2 text-sm font-medium text-blue-100 hover:text-white transition-colors duration-200 hover:bg-blue-800/30 rounded-md"
            >
              {t("contact")}
            </Link>
          </nav>

          {/* Right side buttons */}
          <div className="hidden lg:flex items-center space-x-3">

            {isLoading ? (
              // Loading state
              <div className="w-20 h-9 bg-blue-800/50 rounded-md animate-pulse"></div>
            ) : isAuthenticated ? (
              // Authenticated state
              <div className="flex items-center space-x-3">
                <Link href="/dashboard">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-teal-500 to-blue-600 text-white border-0 hover:from-teal-600 hover:to-blue-700 transition-colors duration-200"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="bg-transparent border-blue-300 text-blue-100 hover:bg-blue-800/50 hover:text-white transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              // Not authenticated state
              <div className="flex items-center space-x-2">
                <Link href="/signin">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-blue-300 text-blue-100 hover:bg-blue-800/50 hover:text-white transition-colors duration-200"
                  >
                    {t("signIn as Farmer ")}
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-teal-500 to-blue-600 text-white border-0 hover:from-teal-600 hover:to-blue-700 transition-colors duration-200"
                  >
                    {t("getStarted")}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md bg-blue-800/50 hover:bg-blue-700/50 transition-colors duration-200"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <nav className="py-3 space-y-1 border-t border-blue-700/50">
            <Link
              href="/"
              className="block px-4 py-2 text-blue-100 hover:text-white hover:bg-blue-800/30 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("home")}
            </Link>
            <Link
              href="/explore"
              className="block px-4 py-2 text-blue-100 hover:text-white hover:bg-blue-800/30 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("exploreSchemes")}
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2 text-blue-100 hover:text-white hover:bg-blue-800/30 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("aboutUs")}
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-2 text-blue-100 hover:text-white hover:bg-blue-800/30 rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("contact")}
            </Link>

            <div className="pt-3 px-4 space-y-2 border-t border-blue-700/50 mt-2">
              <div className="flex justify-center py-2">
                <LanguageToggle />
              </div>

              {isLoading ? (
                // Loading state
                <div className="space-y-2">
                  <div className="w-full h-10 bg-blue-800/50 rounded-md animate-pulse"></div>
                  <div className="w-full h-10 bg-blue-800/50 rounded-md animate-pulse"></div>
                </div>
              ) : isAuthenticated ? (
                // Authenticated state
                <div className="space-y-2">
                  <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white border-0 hover:from-teal-600 hover:to-blue-700 transition-colors duration-200">
                      <User className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleSignOut()
                      setIsMenuOpen(false)
                    }}
                    className="w-full bg-transparent border-blue-300 text-blue-100 hover:bg-blue-800/50 hover:text-white transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                // Not authenticated state
                <div className="space-y-2">
                  <Link href="/signin" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent border-blue-300 text-blue-100 hover:bg-blue-800/50 hover:text-white transition-colors duration-200"
                    >
                      {t("signIn")}
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white border-0 hover:from-teal-600 hover:to-blue-700 transition-colors duration-200">
                      {t("getStarted")}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}