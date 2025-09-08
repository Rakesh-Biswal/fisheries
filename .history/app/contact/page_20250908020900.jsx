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
    console.log("Contact form submitted:", formData)
    setIsSubmitted(true)
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Office",
      details: ["Government Agricultural Office", "Sector 12, City Center", "State - 123456"],
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 123-4568", "Toll-free: 1-800-FISHERY"],
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@fisheries.gov", "support@fisheries.gov", "projects@fisheries.gov"],
      color: "bg-teal-100 text-teal-600",
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 9:00 AM - 2:00 PM", "Sun: Closed"],
      color: "bg-purple-100 text-purple-600",
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
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Card className="transform transition duration-500 hover:scale-105 hover:rotate-1">
            <CardContent className="text-center py-12">
              <div className="bg-green-100 p-4 rounded-full w-fit mx-auto mb-6">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for contacting us. Our team will get back to you within 24 hours.
              </p>
              <div className="space-y-3">
                <p className="text-sm text-gray-500">Reference ID: #MSG-2024-{Math.floor(Math.random() * 1000)}</p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-blue-600 hover:bg-blue-700 transform transition hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance transform transition duration-500 hover:scale-110 hover:rotate-x-6 hover:rotate-y-3">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto text-pretty">
              Get in touch with our expert team for all your fisheries needs
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon
              return (
                <Card
                  key={index}
                  className="text-center hover:shadow-2xl transition-transform duration-500 transform hover:-translate-y-2 hover:rotate-[1deg] hover:scale-105 hover:shadow-blue-300"
                >
                  <CardHeader>
                    <div className={`mx-auto p-3 rounded-full w-fit mb-4 ${info.color}`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-lg text-gray-900">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-gray-600 text-sm">
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

      {/* Contact Form & Map */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="transform transition hover:scale-[1.02] hover:shadow-xl duration-500">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5" />
                    <span>Send us a Message</span>
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Select onValueChange={(value) => handleInputChange("subject", value)}>
                        <SelectTrigger>
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

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your project or inquiry..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Preferred Contact Method</Label>
                      <Select onValueChange={(value) => handleInputChange("preferredContact", value)}>
                        <SelectTrigger>
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
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white transform transition duration-300 hover:scale-105 hover:rotate-1 active:scale-95 shadow-md hover:shadow-xl"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              <Card className="transform transition hover:scale-[1.02] hover:shadow-lg duration-500">
                <CardHeader>
                  <CardTitle>Find Us</CardTitle>
                  <CardDescription>Visit our office for in-person consultation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center transform transition hover:scale-105 hover:rotate-[1deg] duration-500">
                    <div className="text-center text-gray-500">
                      <MapPin className="h-12 w-12 mx-auto mb-2" />
                      <p>Interactive Map</p>
                      <p className="text-sm">Government Agricultural Office</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="transform transition hover:scale-[1.02] hover:shadow-lg duration-500">
                <CardHeader>
                  <CardTitle>Emergency Support</CardTitle>
                  <CardDescription>24/7 support for urgent issues</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium">Emergency Hotline</p>
                        <p className="text-sm text-gray-600">1-800-EMERGENCY</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium">Emergency Email</p>
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

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to common questions</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="transition-transform transform hover:scale-105 hover:rotate-[0.5deg] shadow-md hover:shadow-xl duration-500"
              >
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
