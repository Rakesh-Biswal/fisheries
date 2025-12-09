"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, FileText, HandCoins, GraduationCap, HeadphonesIcon, Truck, MessageCircle, ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Register & Consultation",
    description: "Sign up on our platform and schedule a free consultation with our fish farming experts.",
    icon: FileText,
    color: "from-blue-500 to-cyan-400",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    imageAlt: "Farmers consulting with agricultural experts",
  },
  {
    number: "02",
    title: "Documentation & Verification",
    description: "We handle all required paperwork, land verification, and government scheme eligibility checks.",
    icon: CheckCircle,
    color: "from-emerald-500 to-green-400",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    imageAlt: "Document verification and paperwork process",
  },
  {
    number: "03",
    title: "Funding & Support",
    description: "Access government subsidies and secure seed funding. We guide you through the complete approval process.",
    icon: HandCoins,
    color: "from-amber-500 to-yellow-400",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    imageAlt: "Financial support and funding for farming",
  },
  {
    number: "04",
    title: "Setup & Training",
    description: "Our experts help you set up your fish farm and provide comprehensive training on best practices.",
    icon: GraduationCap,
    color: "from-violet-500 to-purple-400",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    imageAlt: "Farm setup and practical training session",
  },
  {
    number: "05",
    title: "Ongoing Guidance",
    description: "Receive continuous support, seasonal guidance, and technical assistance throughout your farming journey.",
    icon: HeadphonesIcon,
    color: "from-pink-500 to-rose-400",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    imageAlt: "Ongoing support and monitoring of fish farm",
  },
  {
    number: "06",
    title: "Harvest & Buyback",
    description: "When your fish are ready, we buy your entire harvest at competitive prices. Guaranteed profitability!",
    icon: Truck,
    color: "from-orange-500 to-red-400",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    imageAlt: "Fish harvest and market buyback process",
  },
]

function StepCard({ step, index }) {
  const Icon = step.icon
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
        rootMargin: "0px 0px -100px 0px"
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
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative mb-32"
    >
      {/* Content Container */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
        {/* Image Section - Left for even, Right for odd */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: index % 2 === 0 ? -50 : 50 }}
          animate={isVisible ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.9, x: index % 2 === 0 ? -50 : 50 }}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.2 }}
          className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}
        >
          <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden shadow-2xl group">
            {/* Image Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
            
            {/* Step Number on Image */}
            <div className="absolute top-6 left-6 z-20">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                <span className="text-white font-bold text-lg">{step.number}</span>
              </div>
            </div>
            
            {/* Image */}
            <img
              src={step.image}
              alt={step.imageAlt}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Step Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <h4 className="text-white font-bold text-xl">{step.title}</h4>
              <p className="text-gray-200 text-sm mt-1">Visual representation of this step</p>
            </div>
          </div>
        </motion.div>

        {/* Content Card */}
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          className={`relative w-full lg:w-1/2 bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl hover:shadow-2xl border border-gray-200 dark:border-gray-800 transition-all duration-300 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}
        >
          {/* Animated Border */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-blue-500 origin-left rounded-t-2xl"
          />
          
          {/* Step Number Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isVisible ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={{ type: "spring", stiffness: 200, delay: index * 0.2 }}
            className={`absolute -top-6 -left-6 w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl z-10`}
          >
            <span className="text-white font-bold text-2xl">{step.number}</span>
          </motion.div>

          {/* Icon */}
          <motion.div
            initial={{ rotate: -90, opacity: 0 }}
            animate={isVisible ? { rotate: 0, opacity: 1 } : { rotate: -90, opacity: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
            className="mb-6 flex justify-end"
          >
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${step.color} bg-opacity-10`}>
              <Icon className={`w-10 h-10 ${step.color.split(' ')[1].replace('to-', 'text-')}`} />
            </div>
          </motion.div>

          {/* Content */}
          <div className="space-y-4 pt-4">
            {/* Title */}
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.4, delay: index * 0.2 + 0.2 }}
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              {step.title}
            </motion.h3>

            {/* Animated Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
              className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg"
            >
              {step.description}
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Connecting Line - Desktop only, positioned between cards */}
      {index < steps.length - 1 && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isVisible ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.8, delay: (index + 1) * 0.2 }}
          className="hidden lg:block absolute top-full left-1/2 w-1 h-32 bg-gradient-to-b from-gray-300 to-gray-100 dark:from-gray-700 dark:to-gray-800 
            -translate-x-1/2 transform origin-top"
        />
      )}
    </motion.div>
  )
}

function MobileStepCard({ step, index }) {
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
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative mb-16"
    >
      {/* Mobile Card with Image */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={step.image}
            alt={step.imageAlt}
            className="w-full h-full object-cover"
          />
          {/* Step Number Overlay */}
          <div className="absolute top-6 left-6">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
              <span className="text-white font-bold text-lg">{step.number}</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Step Header */}
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center`}>
              <step.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Step {step.number}</span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{step.title}</h3>
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 text-lg">{step.description}</p>
        </div>
      </div>

      {/* Connecting Dot - Mobile */}
      {index < steps.length - 1 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={isVisible ? { scale: 1 } : { scale: 0 }}
          transition={{ type: "spring", stiffness: 200, delay: index * 0.15 + 0.3 }}
          className="absolute bottom-0 left-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 shadow-lg transform -translate-x-1/2 translate-y-8"
        />
      )}
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
      className="text-center mb-20"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={isVisible ? { scale: 1 } : { scale: 0 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-emerald-100 dark:from-blue-900/30 dark:to-emerald-900/30 px-6 py-3 rounded-full mb-6"
      >
        <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
          Visual Step-by-Step Process
        </span>
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
      >
        <span className="text-gray-900 dark:text-white">How It </span>
        <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
          Works
        </span>
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
      >
        Follow our proven 6-step process with visual guidance to turn your fish farming dreams into reality.
      </motion.p>
    </motion.div>
  )
}

function AnimatedCTA() {
  const ctaRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  
  const handleWhatsAppClick = () => {
    const phoneNumber = "+919040626617"
    const message = encodeURIComponent(
      "Hello Fisheries Team,\n\nI'm interested in starting a fish farming business. I've seen your 6-step process and would like to:\n1. Schedule a free consultation\n2. Learn about government subsidies\n3. Understand the documentation required\n4. Get more details about the buyback guarantee\n\nPlease contact me to discuss further. Thank you!"
    )
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }
  
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
    
    if (ctaRef.current) {
      observer.observe(ctaRef.current)
    }
    
    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current)
      }
    }
  }, [])
  
  return (
    <motion.div
      ref={ctaRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="mt-20 text-center"
    >
      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 
        rounded-3xl p-8 md:p-12 max-w-4xl mx-auto border border-blue-100 dark:border-blue-800"
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
              Join 500+ successful farmers who transformed their lives with our proven guidance.
            </p>
            
            {/* WhatsApp Button */}
            <motion.button
              onClick={handleWhatsAppClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold 
                shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 mb-4 w-full md:w-auto"
            >
              <MessageCircle className="w-5 h-5" />
              Chat with Expert on WhatsApp
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Get instant response and personalized guidance
            </p>
          </div>
          <div className="flex-1">
            <div className="relative h-64 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                alt="Successful fish farmer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <p className="text-white text-lg font-medium">Your success story starts here!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function HowItWorksSection() {
  return (
    <section id="process-section" className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" />
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-emerald-100 dark:bg-emerald-900/20 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <AnimatedHeader />

        {/* Steps - Desktop */}
        <div className="hidden lg:block">
          {steps.map((step, index) => (
            <StepCard 
              key={index} 
              step={step} 
              index={index} 
            />
          ))}
        </div>

        {/* Steps - Mobile */}
        <div className="lg:hidden">
          {steps.map((step, index) => (
            <MobileStepCard
              key={index}
              step={step}
              index={index}
            />
          ))}
        </div>

        {/* CTA Section */}
        <AnimatedCTA />

        
      </div>
    </section>
  )
}