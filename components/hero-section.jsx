"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Droplet, Users, IndianRupee, TrendingUp, MessageCircle } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

function Counter({ end, duration = 2, suffix = "", prefix = "" }) {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * end)

      if (countRef.current !== currentCount) {
        countRef.current = currentCount
        setCount(currentCount)
      }

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(step)
  }, [isVisible, end, duration])

  return (
    <div ref={ref}>
      <p className="text-3xl font-bold text-primary">
        {prefix}{count.toLocaleString()}{suffix}
      </p>
    </div>
  )
}

function TypingAnimation({ text, delay = 0, speed = 50 }) {
  const [displayedText, setDisplayedText] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let currentIndex = 0
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.substring(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(interval)
        }
      }, speed)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timer)
  }, [isVisible, text, delay, speed])

  return (
    <span ref={ref}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export function HeroSection() {
  const stats = [
    { icon: Users, value: 500, suffix: "+", label: "Farmers Empowered", delay: 0.2 },
    { icon: IndianRupee, value: 50, suffix: "Cr+", label: "Funds Disbursed", delay: 0.4 },
    { icon: TrendingUp, value: 98, suffix: "%", label: "Success Rate", delay: 0.6 },
  ]

  const handleWhatsAppClick = () => {
    const phoneNumber = "+919040626617"
    const message = encodeURIComponent(
      "Hello Fisheries Team,\n\nI'm interested in starting a fish farming business. I've seen your 6-step process and would like to:\n1. Schedule a free consultation\n2. Learn about government subsidies\n3. Understand the documentation required\n4. Get more details about the buyback guarantee\n\nPlease contact me to discuss further.\nThank you!"
    )
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 backdrop-blur-sm"
            >
              <Droplet size={16} className="text-primary animate-bounce" />
              <span className="text-sm font-medium text-primary">
                Transforming Fish Farming in India
              </span>
            </motion.div>

            {/* Title with Typing Animation */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight min-h-[8rem]">
              Start Your{" "}
              <span className="text-primary">
                <TypingAnimation text="Fish Farming" delay={800} />
              </span>{" "}
              <TypingAnimation text="Journey Today" delay={1200} />
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              Fisheries is your complete platform for fish farming success. Get government subsidies, expert guidance,
              seed funding, and guaranteed market access. We buy your fish and ensure your profit.
            </motion.p>

            {/* Single Large Contact Now Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2 }}
              className="pt-4"
            >
              <motion.button
                onClick={handleWhatsAppClick}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="
    w-full sm:w-auto 
    bg-gradient-to-r from-green-500 to-emerald-600 
    hover:from-green-600 hover:to-emerald-700 
    text-white rounded-full 
    px-6 sm:px-10 py-5 sm:py-7 
    text-base sm:text-lg font-semibold 
    shadow-2xl hover:shadow-3xl transition-all duration-300 
    flex flex-wrap items-center justify-center gap-2 sm:gap-3 group
  "
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-lg sm:text-xl text-center">
                  Contact Now on WhatsApp
                </span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </motion.button>


              {/* Helper Text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 2.2 }}
                className="text-center sm:text-left text-sm text-muted-foreground mt-4 flex items-center justify-center sm:justify-start gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Get instant response from our experts
              </motion.p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: stat.delay + 2 }}
                  className="text-center p-4 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-colors duration-300"
                >
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <Counter end={stat.value} suffix={stat.suffix} duration={1.5} />
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: 10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 mix-blend-overlay" />
              <img
                src="https://www.dailyexcelsior.com/wp-content/uploads/2025/06/fish.jpg"
                alt="Fish farming"
                className="w-full h-[500px] object-cover transform group-hover:scale-105 transition-transform duration-700"
              />

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg"
              >
                <p className="text-sm font-semibold text-foreground">Guaranteed Profit</p>
                <p className="text-2xl font-bold text-primary">₹2L+/Month</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg"
              >
                <p className="text-sm font-semibold text-foreground">Market Access</p>
                <p className="text-lg font-bold text-primary">100% Assured</p>
              </motion.div>

              
            </div>

            {/* Decorative elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4 w-32 h-32 border-4 border-primary/20 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-4 -left-4 w-24 h-24 border-4 border-secondary/20 rounded-full"
            />
          </motion.div>
        </div>

        
      </div>
    </section>
  )
}