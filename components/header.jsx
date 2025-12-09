"use client"

import { useState, useEffect } from "react"
import { Menu, X, Phone, ChevronDown, Fish, User, FileText, Shield, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeDropdown, setActiveDropdown] = useState(null)

  const navItems = [
    { label: "Home", href: "#" },
    {
      label: "Services",
      href: "#services",
      dropdown: [
        { label: "Aquaculture Training", icon: <FileText className="w-4 h-4" /> },
        { label: "Government Schemes", icon: <Shield className="w-4 h-4" /> },
        { label: "Market Access", icon: <TrendingUp className="w-4 h-4" /> },
        { label: "Technical Support", icon: <User className="w-4 h-4" /> }
      ]
    },
    { label: "Schemes", href: "#schemes" },
    { label: "Success Stories", href: "#success" },
    { label: "Resources", href: "#resources" },
    { label: "About Us", href: "#about" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > 100) {
        setIsScrolled(true)

        // Hide header when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
      } else {
        setIsScrolled(false)
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const handleContactClick = () => {
    window.open('tel:+919876543210', '_self')
  }

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)"
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? "bg-white/90 dark:bg-gray-900/90 shadow-lg border-b border-gray-200 dark:border-gray-800"
            : "bg-white/80 dark:bg-gray-900/80 border-b border-transparent"
          }`}
      >
        {/* Top Bar */}


        {/* Main Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md">
                  <Fish className="w-5 h-5 text-white" />
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-1 border-2 border-primary/20 rounded-xl"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Fisheries
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Government Certified Aquaculture
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={item.href}
                    className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    {item.label}
                    {item.dropdown && (
                      <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-200" />
                    )}
                  </a>

                  {/* Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 p-2"
                    >
                      {item.dropdown.map((dropdownItem) => (
                        <a
                          key={dropdownItem.label}
                          href="#"
                          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                        >
                          <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                            {dropdownItem.icon}
                          </div>
                          <span className="text-sm font-medium text-foreground group-hover:text-primary">
                            {dropdownItem.label}
                          </span>
                        </a>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}

              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200 dark:border-gray-800">
                <Button
                  variant="outline"
                  className="rounded-full border-primary/30 hover:border-primary hover:bg-primary/5"
                  onClick={() => window.location.href = "/signin"}
                >
                  SignIn As Farmer
                </Button>


              </div>
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-1">
                {navItems.map((item) => (
                  <div key={item.label}>
                    <a
                      href={item.href}
                      className="flex items-center justify-between px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      onClick={() => item.dropdown && setActiveDropdown(
                        activeDropdown === item.label ? null : item.label
                      )}
                    >
                      {item.label}
                      {item.dropdown && (
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.label ? "rotate-180" : ""
                          }`} />
                      )}
                    </a>

                    {item.dropdown && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-8 space-y-1"
                      >
                        {item.dropdown.map((dropdownItem) => (
                          <a
                            key={dropdownItem.label}
                            href="#"
                            className="flex items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                          >
                            {dropdownItem.icon}
                            {dropdownItem.label}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}

                <div className="pt-4 space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-center rounded-full border-primary/30"
                  >
                    Login
                  </Button>
                  <Button className="w-full justify-center bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-lg">
                    Get Started
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-center text-primary"
                    onClick={handleContactClick}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now: +91 98765 43210
                  </Button>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Progress Indicator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isScrolled ? (window.scrollY / (document.body.scrollHeight - window.innerHeight)) : 0 }}
          className="h-0.5 bg-gradient-to-r from-primary to-secondary origin-left"
        />
      </motion.header>

      {/* Scroll to top indicator */}
      <AnimatePresence>
        {isScrolled && isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 rounded-full shadow-lg border border-gray-200 dark:border-gray-800">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-foreground">Scroll for more</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}