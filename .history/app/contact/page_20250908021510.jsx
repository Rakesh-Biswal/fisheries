"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    preferredContact: "phone",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In real app, this would submit to backend
    console.log("Contact form submitted:", formData)
    setIsSubmitted(true)
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Office",
      details: ["Government Agricultural Office", "Sector 12, City Center", "State - 123456"],
      color: "bg-blue-100 text-blue-600",
      gradient: "from-blue-400 to-blue-600",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 123-4568", "Toll-free: 1-800-FISHERY"],
      color: "bg-green-100 text-green-600",
      gradient: "from-green-400 to-green-600",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@fisheries.gov", "support@fisheries.gov", "projects@fisheries.gov"],
      color: "bg-teal-100 text-teal-600",
      gradient: "from-teal-400 to-teal-600",
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 9:00 AM - 2:00 PM", "Sunday: Closed"],
      color: "bg-purple-100 text-purple-600",
      gradient: "from-purple-400 to-purple-600",
    },
  ]

  const faqs = [
    {
      question: "How long does a typical pond construction project take?",
      answer:
        "Most pond construction projects take 2-4 weeks depending on size and complexity. We provide detailed timelines during consultation.",
    },
    {
      question: "Do you provide financing options for projects?",
      answer:
        "Yes, we work with government schemes and financial institutions to provide affordable financing options for eligible farmers.",
    },
    {
      question: "What kind of ongoing support do you provide?",
      answer:
        "We offer 24/7 technical support, regular maintenance services, training programs, and consultation for the lifetime of your project.",
    },
    {
      question: "Can I visit existing projects before starting mine?",
      answer:
        "We can arrange visits to successful projects in your area so you can see our work firsthand and talk to other farmers.",
    },
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-200 to-teal-200 rounded-full opacity-20 animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-green-200 to-blue-200 rounded-full opacity-30 animate-float-delayed"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-teal-200 to-purple-200 rounded-full opacity-15 animate-float-slow"></div>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <Card className="transform hover:scale-105 transition-all duration-500 shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="text-center py-12">
              <div className="bg-gradient-to-r from-green-400 to-green-600 p-4 rounded-full w-fit mx-auto mb-6 transform hover:rotate-12 transition-transform duration-300 shadow-lg">
                <CheckCircle className="h-12 w-12 text-white animate-bounce-slow" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4 animate-fade-in-up">
                Message Sent Successfully!
              </h2>
              <p className="text-gray-600 mb-6 text-lg animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                Thank you for contacting us. Our team will get back to you within 24 hours.
              </p>
              <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                <p className="text-sm text-gray-500">Reference ID: #MSG-2024-{Math.floor(Math.random() * 1000)}</p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Send Another Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-10 w-64 h-64 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full opacity-30 animate-float blur-3xl"></div>
        <div className="absolute top-96 right-20 w-48 h-48 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full opacity-25 animate-float-delayed blur-2xl"></div>
        <div className="absolute bottom-32 left-1/3 w-80 h-80 bg-gradient-to-r from-teal-100 to-green-100 rounded-full opacity-20 animate-float-slow blur-3xl"></div>

        {/* Fish silhouettes */}
        <div className="absolute top-1/4 left-1/4 w-8 h-8 opacity-10">
          <div className="w-full h-full bg-blue-400 rounded-full animate-swim-1"></div>
        </div>
        <div className="absolute top-1/2 right-1/3 w-6 h-6 opacity-15">
          <div className="w-full h-full bg-teal-400 rounded-full animate-swim-2"></div>
        </div>
        <div className="absolute bottom-1/3 left-1/2 w-10 h-10 opacity-8">
          <div className="w-full h-full bg-green-400 rounded-full animate-swim-3"></div>
        </div>
      </div>

      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-teal-600/20 animate-gradient-x"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-white/5 rounded-full animate-float-delayed"></div>
          <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-white/5 rounded-full animate-float-slow"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center transform hover:scale-105 transition-all duration-700">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance animate-fade-in-up transform hover:rotate-y-12 transition-all duration-500 perspective-1000">
              Contact Us
            </h1>
            <p
              className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto text-pretty animate-fade-in-up transform hover:translate-z-4 transition-all duration-500"
              style={{ animationDelay: "0.2s" }}
            >
              Get in touch with our expert team for all your fisheries needs
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon
              return (
                <Card
                  key={index}
                  className="text-center group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 hover:rotate-y-6 border-0 bg-white/80 backdrop-blur-sm perspective-1000"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="transform group-hover:translate-z-4 transition-all duration-300">
                    <div
                      className={`mx-auto p-4 rounded-full w-fit mb-4 bg-gradient-to-r ${info.gradient} shadow-lg transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {info.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="transform group-hover:translate-z-2 transition-all duration-300">
                    <div className="space-y-1">
                      {info.details.map((detail, detailIndex) => (
                        <p
                          key={detailIndex}
                          className="text-gray-600 text-sm group-hover:text-gray-800 transition-colors duration-300"
                        >
                          {detail}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-teal-50/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="transform hover:scale-105 transition-all duration-500">
              <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2 text-xl">
                    <MessageCircle className="h-6 w-6 animate-bounce-slow" />
                    <span>Send us a Message</span>
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    Fill out the form below and we'll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2 group">
                        <Label htmlFor="name" className="group-hover:text-blue-600 transition-colors duration-300">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                          className="transform group-hover:scale-105 transition-all duration-300 focus:scale-105 border-2 focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-2 group">
                        <Label htmlFor="phone" className="group-hover:text-blue-600 transition-colors duration-300">
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          required
                          className="transform group-hover:scale-105 transition-all duration-300 focus:scale-105 border-2 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 group">
                      <Label htmlFor="email" className="group-hover:text-blue-600 transition-colors duration-300">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className="transform group-hover:scale-105 transition-all duration-300 focus:scale-105 border-2 focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-2 group">
                      <Label htmlFor="subject" className="group-hover:text-blue-600 transition-colors duration-300">
                        Subject *
                      </Label>
                      <Select onValueChange={(value) => handleInputChange("subject", value)}>
                        <SelectTrigger className="transform group-hover:scale-105 transition-all duration-300 border-2 focus:border-blue-500">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="project">New Project</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="pricing">Pricing Information</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 group">
                      <Label htmlFor="message" className="group-hover:text-blue-600 transition-colors duration-300">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your project or inquiry..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        required
                        className="transform group-hover:scale-105 transition-all duration-300 focus:scale-105 border-2 focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-2 group">
                      <Label className="group-hover:text-blue-600 transition-colors duration-300">
                        Preferred Contact Method
                      </Label>
                      <Select onValueChange={(value) => handleInputChange("preferredContact", value)}>
                        <SelectTrigger className="transform group-hover:scale-105 transition-all duration-300 border-2 focus:border-blue-500">
                          <SelectValue placeholder="How should we contact you?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="phone">Phone Call</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="visit">Farm Visit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl py-3"
                    >
                      <Send className="h-5 w-5 mr-2 animate-bounce-slow" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card className="transform hover:scale-105 transition-all duration-500 shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl hover:-translate-y-1">
                <CardHeader className="bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 animate-bounce-slow" />
                    <span>Find Us</span>
                  </CardTitle>
                  <CardDescription className="text-teal-100">
                    Visit our office for in-person consultation
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-64 rounded-lg flex items-center justify-center transform hover:scale-105 transition-all duration-300 shadow-inner">
                    <div className="text-center text-gray-500 transform hover:scale-110 transition-all duration-300">
                      <MapPin className="h-12 w-12 mx-auto mb-2 animate-bounce-slow" />
                      <p className="font-semibold">Interactive Map</p>
                      <p className="text-sm">Government Agricultural Office</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="transform hover:scale-105 transition-all duration-500 shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl hover:-translate-y-1">
                <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 animate-pulse" />
                    <span>Emergency Support</span>
                  </CardTitle>
                  <CardDescription className="text-red-100">24/7 support for urgent issues</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 group transform hover:translate-x-2 transition-all duration-300">
                      <div className="p-2 bg-red-100 rounded-full group-hover:bg-red-200 transition-colors duration-300">
                        <Phone className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium group-hover:text-red-600 transition-colors duration-300">
                          Emergency Hotline
                        </p>
                        <p className="text-sm text-gray-600">1-800-EMERGENCY</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 group transform hover:translate-x-2 transition-all duration-300">
                      <div className="p-2 bg-red-100 rounded-full group-hover:bg-red-200 transition-colors duration-300">
                        <Mail className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium group-hover:text-red-600 transition-colors duration-300">
                          Emergency Email
                        </p>
                        <p className="text-sm text-gray-600">emergency@fisheries.gov</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 transform hover:scale-105 transition-all duration-500">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent mb-4 animate-fade-in-up">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 border-0 bg-white/80 backdrop-blur-sm animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="transform group-hover:translate-z-2 transition-all duration-300">
                  <CardTitle className="text-lg text-gray-900 group-hover:text-blue-600 transition-colors duration-300 group-hover:translate-x-2">
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="transform group-hover:translate-z-1 transition-all duration-300">
                  <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
