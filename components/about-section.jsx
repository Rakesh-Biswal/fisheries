"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Building2, Target, ShieldCheck, Users, MapPin, Award } from "lucide-react"

function TypingText({ text, delay = 0, duration = 0.02 }) {
  const [displayText, setDisplayText] = useState("")
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.3 }
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
          setDisplayText(text.substring(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(interval)
        }
      }, duration * 1000)

      return () => clearInterval(interval)
    }, delay * 1000)

    return () => clearTimeout(timer)
  }, [isVisible, text, delay, duration])

  return (
    <span ref={ref} className="inline-block">
      {displayText}
      {isVisible && displayText.length < text.length && (
        <span className="ml-1 w-[2px] h-6 bg-gradient-to-b from-primary to-secondary animate-pulse inline-block" />
      )}
    </span>
  )
}

function AnimatedCard({ icon: Icon, title, description, delay, index }) {
  const cardRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -50px 0px" }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.95 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="group relative"
    >
      {/* Card Background */}
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl hover:shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300">
        
        {/* Animated Gradient Border */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-blue-500 origin-left"
        />

        {/* Floating Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -90 }}
          animate={isVisible ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0, rotate: -90 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            delay: delay + 0.1 
          }}
          className="relative mb-8"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 rounded-2xl blur-xl" />
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center shadow-lg">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2 border-2 border-blue-300/30 dark:border-blue-700/30 rounded-3xl"
          />
        </motion.div>

        {/* Card Number */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.4, delay: delay + 0.2 }}
          className="flex items-center gap-2 mb-2"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
            <span className="text-white text-sm font-bold">{String(index + 1).padStart(2, '0')}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
        </motion.div>

        {/* Animated Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: delay + 0.4 }}
          className="text-gray-600 dark:text-gray-400 leading-relaxed"
        >
          {description}
        </motion.p>

        {/* Hover Indicator */}
        <motion.div
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-emerald-500"
        />
      </div>

      {/* Glow Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.2 }}
        className="absolute inset-0 bg-gradient-to-br from-blue-500 to-emerald-500 blur-2xl -z-10 opacity-0 transition-opacity duration-300"
      />
    </motion.div>
  )
}

export function AboutSection() {
  const sectionRef = useRef(null)
  const [isHeaderVisible, setIsHeaderVisible] = useState(false)

  const stats = [
    { icon: Users, value: "500+", label: "Farmers Empowered", delay: 0.8 },
    { icon: MapPin, value: "50+", label: "Cities Covered", delay: 1.0 },
    { icon: Award, value: "98%", label: "Success Rate", delay: 1.2 },
  ]

  const cards = [
    {
      icon: Building2,
      title: "Our Foundation",
      description: "Founded in Berhampur, Odisha, and now headquartered in Bhubaneswar's Saheed Nagar. A trusted part of the Digadarshan Group ecosystem with deep roots in agricultural transformation.",
      delay: 0.3,
    },
    {
      icon: Target,
      title: "Our Mission",
      description: "Empower aspiring fish farmers with complete support from documentation to market access, making fish farming accessible and profitable for all through sustainable practices.",
      delay: 0.5,
    },
    {
      icon: ShieldCheck,
      title: "Our Promise",
      description: "You buy fish seed from us, and we buy big fish from you. Zero-risk farming with guaranteed buyback and complete business support, ensuring your investment is protected.",
      delay: 0.7,
    },
  ]

  return (
    <section 
      ref={sectionRef}
      id="about-section" 
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" />
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            x: [0, 20, 0]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            y: [0, 30, 0],
            x: [0, -20, 0]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-100 dark:bg-emerald-900/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onViewportEnter={() => setIsHeaderVisible(true)}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isHeaderVisible ? { scale: 1 } : { scale: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-emerald-100 dark:from-blue-900/30 dark:to-emerald-900/30 px-6 py-3 rounded-full mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 animate-pulse" />
            <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
              About Our Platform
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-gray-900 dark:text-white">About </span>
            <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
              <TypingText text="Fisheries Platform" delay={0.3} duration={0.03} />
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isHeaderVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Powered by <span className="font-semibold text-gray-900 dark:text-white">Digadarshan Group</span>, Fisheries is 
            revolutionizing fish farming in India by connecting farmers with government schemes, funding, and guaranteed 
            market opportunities through innovative technology and expert guidance.
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {cards.map((card, index) => (
            <AnimatedCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
              delay={card.delay}
              index={index}
            />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative"
        >
          {/* Background for Stats */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-emerald-500/5 rounded-3xl blur-xl" />
          
          <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-gray-800">
            <div className="grid md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: stat.delay }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-emerald-500/10 mb-4"
                  >
                    <stat.icon className="w-8 h-8 text-gray-700 dark:text-gray-300" />
                  </motion.div>
                  <motion.p
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: stat.delay + 0.2 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent mb-2"
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-3xl p-8 md:p-12 max-w-3xl mx-auto border border-blue-100 dark:border-blue-800">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.7 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Join the Revolution in Fish Farming
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.9 }}
              viewport={{ once: true }}
              className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto"
            >
              Be part of a growing community of successful fish farmers transforming their livelihoods with our proven platform.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Connect With Our Experts
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}