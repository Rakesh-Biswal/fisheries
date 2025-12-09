"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Phone, Mail, MessageCircle, CheckCircle, Users, Calendar } from "lucide-react"

export function CtaSection() {
  const sectionRef = useRef(null)
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleWhatsAppClick = () => {
    const phoneNumber = "+919040626617"
    const message = encodeURIComponent(
      "Hello Fisheries Team,\n\nI'm interested in starting a fish farming business. I'd like to know more about:\n1. Government subsidies available\n2. Required documentation\n3. Investment requirements\n4. Training programs\n\nPlease share more details. Thank you!"
    )
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  const handleCallClick = () => {
    window.open('tel:+919040626617', '_self')
  }

  const handleEmailClick = () => {
    window.location.href = 'mailto:info@fisheries.in?subject=Inquiry%20about%20Fish%20Farming&body=Hello%20Fisheries%20Team,%0A%0AI%20am%20interested%20in%20starting%20a%20fish%20farming%20business.%20Please%20share%20more%20details.'
  }

  const features = [
    { icon: CheckCircle, text: "Free Consultation", color: "text-green-500" },
    { icon: Calendar, text: "Documentation Support", color: "text-blue-500" },
    { icon: Users, text: "Expert Guidance", color: "text-purple-500" },
    { icon: MessageCircle, text: "24/7 WhatsApp Support", color: "text-emerald-500" },
  ]

  return (
    <section
      ref={sectionRef}
      id="cta-section"
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-blue-900/20 dark:via-gray-900 dark:to-emerald-900/20">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full blur-3xl opacity-30"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-10 w-96 h-96 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full blur-3xl opacity-30"
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isVisible ? { scale: 1 } : { scale: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 px-6 py-3 rounded-full mb-8"
          >
            <MessageCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              WhatsApp Support Available
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-gray-900 dark:text-white">Start Your </span>
            <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
              Fish Farming Business
            </span>
            <span className="text-gray-900 dark:text-white"> Today</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Join hundreds of successful fish farmers who have transformed their lives with Fisheries. 
            Get complete support from documentation to market access with government backing.
          </motion.p>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center justify-center p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800"
              >
                <feature.icon className={`w-6 h-6 mb-2 ${feature.color}`} />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            {/* WhatsApp Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWhatsAppClick}
              className="group bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* Call Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCallClick}
              className="group bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl border-2 border-green-500/30 hover:border-green-500 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Phone className="w-5 h-5 text-green-600" />
              Call Now
            </motion.button>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="pt-12 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {/* Phone Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="group p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-green-500 transition-all duration-300 cursor-pointer"
                onClick={handleCallClick}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/20 flex items-center justify-center"
                  >
                    <Phone className="w-7 h-7 text-blue-600" />
                  </motion.div>
                  <div className="text-left">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Call Us Anytime</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 transition-colors">
                      +91 90406 26617
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">24/7 Support Available</p>
                  </div>
                </div>
              </motion.div>

              {/* Email Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="group p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 transition-all duration-300 cursor-pointer"
                onClick={handleEmailClick}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/20 flex items-center justify-center"
                  >
                    <Mail className="w-7 h-7 text-emerald-600" />
                  </motion.div>
                  <div className="text-left">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Email Us</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      info@fisheries.in
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Response within 2 hours</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Action Note */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Click WhatsApp button to start conversation with our experts</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating WhatsApp Button for mobile */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ delay: 1.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleWhatsAppClick}
          className="fixed bottom-8 right-8 z-50 md:hidden"
        >
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full p-4 shadow-2xl">
            <MessageCircle className="w-6 h-6" />
          </div>
        </motion.button>
      </div>
    </section>
  )
}