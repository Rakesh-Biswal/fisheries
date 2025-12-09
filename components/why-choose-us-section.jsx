"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Shield, Handshake, FileCheck, Wallet, Users, Eye } from "lucide-react"

const reasons = [
  {
    title: "Zero-Risk Farming",
    description: "We guarantee to buy your fish harvest. Your investment is protected with our buyback promise.",
    icon: Shield,
    color: "from-green-500 to-emerald-400",
    delay: 0.1,
  },
  {
    title: "Complete Hand-Holding",
    description: "From paperwork to pond setup to selling, we support you at every step of your journey.",
    icon: Handshake,
    color: "from-blue-500 to-cyan-400",
    delay: 0.2,
  },
  {
    title: "Government Subsidies",
    description: "Access up to 50% subsidies on equipment and infrastructure through government schemes.",
    icon: FileCheck,
    color: "from-purple-500 to-violet-400",
    delay: 0.3,
  },
  {
    title: "Flexible Financing",
    description: "Easy loan approvals with minimal interest rates and government guarantee backing.",
    icon: Wallet,
    color: "from-amber-500 to-yellow-400",
    delay: 0.4,
  },
  {
    title: "Expert Knowledge",
    description: "Learn from experienced fish farming professionals with decades of combined industry expertise.",
    icon: Users,
    color: "from-red-500 to-pink-400",
    delay: 0.5,
  },
  {
    title: "Transparent Pricing",
    description: "No hidden costs. Competitive market rates for your harvest and clear terms of engagement.",
    icon: Eye,
    color: "from-indigo-500 to-blue-400",
    delay: 0.6,
  },
]

function ReasonCard({ reason, index }) {
  const Icon = reason.icon
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
      {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px"
      }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.9 }}
      transition={{
        duration: 0.6,
        delay: reason.delay,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="group relative"
    >
      {/* Card Background */}
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300">
        {/* Animated Border */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: reason.delay + 0.3 }}
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-20 origin-left"
          style={{ color: reason.color.split(' ')[1].replace('to-', '#') }}
        />

        {/* Floating Number Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            delay: reason.delay,
            duration: 0.5 
          }}
          className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center shadow-lg"
        >
          <span className="text-xs font-bold text-white">{String(index + 1).padStart(2, '0')}</span>
        </motion.div>

        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, rotate: -90 }}
          animate={isVisible ? { opacity: 1, rotate: 0 } : { opacity: 0, rotate: -90 }}
          transition={{ duration: 0.5, delay: reason.delay + 0.1 }}
          className="mb-6"
        >
          <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${reason.color} bg-opacity-10`}>
            <Icon className={`w-8 h-8 ${reason.color.split(' ')[1].replace('to-', 'text-')}`} />
          </div>
        </motion.div>

        {/* Content */}
        <div className="space-y-4">
          {/* Title with Character Animation */}
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.4, delay: reason.delay + 0.2 }}
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            {reason.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: reason.delay + 0.4 }}
            className="text-gray-600 dark:text-gray-400 leading-relaxed"
          >
            {reason.description}
          </motion.p>
        </div>

        {/* Checkmark Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.3, delay: reason.delay + 0.6 }}
          className="absolute bottom-4 right-4"
        >
          <div className={`p-2 rounded-full bg-gradient-to-br ${reason.color} bg-opacity-10`}>
            <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${reason.color} flex items-center justify-center`}>
              <span className="text-white text-sm">✓</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Hover Effect Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.3 }}
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-current blur-xl -z-10 opacity-0 transition-opacity duration-300"
        style={{ color: reason.color.split(' ')[1].replace('to-', '#') }}
      />
    </motion.div>
  )
}

function AnimatedHeader() {
  const headerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px"
      }
    )

    if (headerRef.current) {
      observer.observe(headerRef.current)
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current)
      }
    }
  }, [])

  return (
    <motion.div
      ref={headerRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={isVisible ? { scale: 1 } : { scale: 0 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-emerald-100 dark:from-blue-900/30 dark:to-emerald-900/30 px-6 py-3 rounded-full mb-6"
      >
        <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
          Premium Benefits
        </span>
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
      >
        <span className="text-gray-900 dark:text-white">Why Choose </span>
        <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
          Fisheries?
        </span>
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
      >
        Here's what sets us apart from other platforms in the fish farming industry.
      </motion.p>
    </motion.div>
  )
}

export function WhyChooseUsSection() {
  const sectionRef = useRef(null)

  return (
    <section 
      ref={sectionRef}
      id="why-us-section" 
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        {/* Animated Background Elements */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-10 w-96 h-96 bg-blue-100 dark:bg-blue-900/10 rounded-full blur-3xl opacity-50"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-10 w-96 h-96 bg-emerald-100 dark:bg-emerald-900/10 rounded-full blur-3xl opacity-50"
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <AnimatedHeader />

        {/* Grid of Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <ReasonCard 
              key={index} 
              reason={reason} 
              index={index} 
            />
          ))}
        </div>

        {/* Summary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-3xl p-8 md:p-10 max-w-3xl mx-auto border border-blue-100 dark:border-blue-800">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 mb-4"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center">
                <span className="text-white font-bold">✓</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                100% Success Guarantee
              </h3>
            </motion.div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Join hundreds of successful farmers who have transformed their lives with our comprehensive support system.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started Today
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}