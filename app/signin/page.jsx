"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthLayout } from "@/components/auth-layout"
import { Phone, Lock, ArrowRight } from "lucide-react"

// Dummy user data (in real app, this would be from database)
const dummyUsers = [
  { phone: "9876543210", password: "password123", name: "Rahul Kumar", type: "farmer" },
  { phone: "9123456789", password: "farmer123", name: "Priya Singh", type: "farmer" },
  { phone: "9988776655", password: "test123", name: "Amit Sharma", type: "farmer" }
]

export default function SignInPage() {
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.phone) {
      newErrors.phone = "Phone number is required"
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Check if user exists in dummy data
      const user = dummyUsers.find(
        user => user.phone === formData.phone && user.password === formData.password
      )

      if (user) {
        // Store user data in localStorage (in real app, use proper auth)
        localStorage.setItem("currentUser", JSON.stringify(user))
        console.log("Login successful:", user.name)

        // Redirect to dashboard
        window.location.href = "/dashboard"
      } else {
        setErrors({ submit: "Invalid phone number or password" })
      }
    } catch (error) {
      console.error("Login error:", error)
      setErrors({ submit: "Something went wrong. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Welcome Back"
      titleOdia="ସ୍ୱାଗତମ୍"
      subtitle="Sign in to your farmer account"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Phone Input */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium">
            Phone Number
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="phone"
              type="tel"
              placeholder="9876543210"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value.replace(/\D/g, ""))}
              className={`pl-10 h-11 ${errors.phone ? "border-destructive" : ""}`}
              maxLength={10}
            />
          </div>
          {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <Link href="/forgot-password" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={`pl-10 h-11 ${errors.password ? "border-destructive" : ""}`}
            />
          </div>
          {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
        </div>

        {/* Demo Credentials */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm font-medium text-blue-800 mb-2">Demo Credentials:</p>
          <div className="text-xs text-blue-700 space-y-1">
            <p>Phone: 9876543210 | Password: password123</p>
            <p>Phone: 9123456789 | Password: farmer123</p>
            <p>Phone: 9988776655 | Password: test123</p>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-11"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Signing in...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              Sign In
              <ArrowRight className="h-4 w-4" />
            </div>
          )}
        </Button>

        {errors.submit && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-sm text-destructive">{errors.submit}</p>
          </div>
        )}
      </form>

      {/* Sign Up Link */}
      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline font-medium">
            Create your account
          </Link>
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          <span className="font-semibold text-primary">ଓଡ଼ିଆରେ:</span> ଖାତା ନାହିଁ? ନୂତନ ଖାତା ଖୋଲନ୍ତୁ
        </p>
      </div>

      {/* Trust Badge */}
      <div className="mt-8 p-4 bg-secondary/50 rounded-lg text-center">
        <p className="text-xs text-muted-foreground">
          🔒 Your data is secure and protected. We follow government data protection guidelines.
        </p>
      </div>
    </AuthLayout>
  )
}