"use client"

import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Fish } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState("")

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter subscription
    setEmail("")
  }

  return (
    <footer className="relative bg-gradient-to-b from-background to-gray-50 dark:to-gray-900 border-t border-border pt-16 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-5 gap-10 mb-12">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                  <Fish className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <h2 className="font-bold text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Fisheries
                </h2>
                <p className="text-sm text-muted-foreground">Sustainable Aquaculture Solutions</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Empowering Indian farmers with modern fish farming techniques, government subsidies, 
              and end-to-end support for sustainable aquaculture.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">+91 90406 26617</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">support@fisheries.com</span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-primary mt-1" />
                <span className="text-muted-foreground">
                  Saheed Nagar, Khordha District<br />
                  Bhubaneswar, Odisha 751021, India
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-foreground relative pb-2">
              Quick Links
              <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-primary" />
            </h4>
            <ul className="space-y-4">
              {["About Us", "Services", "Schemes", "Success Stories", "Contact Us"].map((item, index) => (
                <motion.li 
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a 
                    href="#" 
                    className="text-muted-foreground hover:text-primary hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-foreground relative pb-2">
              Resources
              <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-primary" />
            </h4>
            <ul className="space-y-4">
              {["Blog & Articles", "Learning Center", "Research Papers", "Video Tutorials", "FAQ"].map((item, index) => (
                <motion.li 
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a 
                    href="#" 
                    className="text-muted-foreground hover:text-primary hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-lg mb-6 text-foreground relative pb-2">
              Stay Updated
              <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-primary" />
            </h4>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to get updates on government schemes and farming tips.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Subscribe
              </button>
            </form>
            
            {/* Social Media */}
            <div className="mt-8">
              <p className="text-sm text-muted-foreground mb-4">Follow Us</p>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, label: "Facebook" },
                  { icon: Twitter, label: "Twitter" },
                  { icon: Instagram, label: "Instagram" },
                  { icon: Linkedin, label: "LinkedIn" }
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-white hover:bg-primary hover:border-primary transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-muted-foreground text-sm">
                © {currentYear} <span className="font-medium text-foreground">Fisheries</span>. 
                A Digadarshan Group Initiative. All rights reserved.
              </p>
              
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap gap-6 justify-center">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Disclaimer"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Made with love */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Empowering Indian Farmers</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            </div>
          </div>

          {/* Accreditation */}
          
        </div>

        {/* Back to Top */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ↑
        </motion.button>
      </div>
    </footer>
  )
}