"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthLayout } from "@/components/auth-layout"
import { User, Phone, Mail, Lock, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react"
import { initializeApp } from "firebase/app"
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export default function SignUpPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null)
  const [confirmationResult, setConfirmationResult] = useState(null)

  // Step 1: Name and Phone
  const [step1Data, setStep1Data] = useState({
    fullName: "",
    phone: "",
  })

  // Step 2: OTP Verification
  const [otpData, setOtpData] = useState({
    otp: "",
  })

  // Step 3: Email, Password, Profile Picture
  const [step3Data, setStep3Data] = useState({
    email: "",
    password: "",
    profilePicture: null,
    profilePreview: "",
  })

  useEffect(() => {
    // Initialize reCAPTCHA verifier
    if (typeof window !== "undefined") {
      const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: () => {
          console.log("[v0] reCAPTCHA solved")
        },
      })
      setRecaptchaVerifier(verifier)
    }

    return () => {
      if (recaptchaVerifier) {
        recaptchaVerifier.clear()
      }
    }
  }, [])

  // Step 1: Send OTP using Firebase
  const handleStep1Submit = async (e) => {
    e.preventDefault()
    setErrors({})

    // Validation
    if (!step1Data.fullName.trim()) {
      setErrors({ fullName: "Name is required" })
      return
    }
    if (!step1Data.phone || !/^[6-9]\d{9}$/.test(step1Data.phone)) {
      setErrors({ phone: "Please enter a valid 10-digit phone number" })
      return
    }

    setIsLoading(true)

    try {
      const phoneNumber = `+91${step1Data.phone}`

      if (!recaptchaVerifier) {
        throw new Error("reCAPTCHA not initialized")
      }

      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
      setConfirmationResult(confirmation)
      setCurrentStep(2)
      console.log("[v0] OTP sent successfully")
    } catch (error) {
      console.error("[v0] Error sending OTP:", error)
      setErrors({ phone: error.message || "Failed to send OTP. Please try again." })

      // Reset reCAPTCHA on error
      if (recaptchaVerifier) {
        recaptchaVerifier.clear()
        const newVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
          size: "invisible",
          callback: () => {
            console.log("[v0] reCAPTCHA solved")
          },
        })
        setRecaptchaVerifier(newVerifier)
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Step 2: Verify OTP using Firebase
  const handleStep2Submit = async (e) => {
    e.preventDefault()
    setErrors({})

    if (!otpData.otp || otpData.otp.length !== 6) {
      setErrors({ otp: "Please enter a valid 6-digit OTP" })
      return
    }

    if (!confirmationResult) {
      setErrors({ otp: "Please request OTP again" })
      return
    }

    setIsLoading(true)

    try {
      const result = await confirmationResult.confirm(otpData.otp)
      console.log(" Phone verified successfully:", result.user.uid)
      setCurrentStep(3)
    } catch (error) {
      console.error(" Error verifying OTP:", error)
      setErrors({ otp: "Invalid OTP. Please check and try again." })
    } finally {
      setIsLoading(false)
    }
  }

  // Step 3: Complete Registration
  const handleStep3Submit = async (e) => {
    e.preventDefault()
    setErrors({})

    // Validation
    const newErrors = {}
    if (!step3Data.email || !/\S+@\S+\.\S+/.test(step3Data.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!step3Data.password || step3Data.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("fullName", step1Data.fullName)
      formData.append("phone", `+91${step1Data.phone}`)
      formData.append("email", step3Data.email)
      formData.append("password", step3Data.password)

      if (step3Data.profilePicture) {
        formData.append("profilePicture", step3Data.profilePicture)
      }

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        alert("Account created successfully! Please sign in.")
        window.location.href = "/signin"
      } else {
        setErrors({ submit: data.error || "Failed to create account" })
      }
    } catch (error) {
      console.error("[v0] Signup error:", error)
      setErrors({ submit: "Network error. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ profilePicture: "File size must be less than 5MB" })
        return
      }

      setStep3Data((prev) => ({
        ...prev,
        profilePicture: file,
        profilePreview: URL.createObjectURL(file),
      }))
      setErrors((prev) => ({ ...prev, profilePicture: "" }))
    }
  }

  return (
    <AuthLayout
      title="Join Our Community"
      titleOdia="ଆମର ସମୁଦାୟରେ ଯୋଗ ଦିଅନ୍ତୁ"
      subtitle={`Step ${currentStep} of 3: ${
        currentStep === 1 ? "Basic Information" : currentStep === 2 ? "Phone Verification" : "Complete Your Profile"
      }`}
    >
      {/* reCAPTCHA container */}
      <div id="recaptcha-container"></div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step < currentStep
                    ? "bg-primary text-primary-foreground"
                    : step === currentStep
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
              </div>
              {step < 3 && <div className={`w-16 h-1 mx-2 ${step < currentStep ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>
        <div className="text-sm text-muted-foreground text-center">
          {currentStep === 1 && "Enter your name and phone number"}
          {currentStep === 2 && "Verify your phone with OTP"}
          {currentStep === 3 && "Complete your profile setup"}
        </div>
      </div>

      {/* Step 1: Name and Phone */}
      {currentStep === 1 && (
        <form onSubmit={handleStep1Submit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium">
              Full Name *
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={step1Data.fullName}
                onChange={(e) => setStep1Data((prev) => ({ ...prev, fullName: e.target.value }))}
                className={`pl-10 ${errors.fullName ? "border-destructive" : ""}`}
              />
            </div>
            {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone Number *
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <div className="absolute left-10 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                +91
              </div>
              <Input
                id="phone"
                type="tel"
                placeholder="9876543210"
                value={step1Data.phone}
                onChange={(e) => setStep1Data((prev) => ({ ...prev, phone: e.target.value }))}
                className={`pl-16 ${errors.phone ? "border-destructive" : ""}`}
              />
            </div>
            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
            <p className="text-xs text-muted-foreground">We'll send an OTP to verify your phone number</p>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Sending OTP...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                Verify Phone
                <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </Button>
        </form>
      )}

      {/* Step 2: OTP Verification */}
      {currentStep === 2 && (
        <form onSubmit={handleStep2Submit} className="space-y-6">
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground">
              We've sent a 6-digit OTP to <strong>+91{step1Data.phone}</strong>
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="otp" className="text-sm font-medium">
              Enter OTP *
            </Label>
            <Input
              id="otp"
              type="text"
              placeholder=""
              maxLength={6}
              value={otpData.otp}
              onChange={(e) => setOtpData((prev) => ({ ...prev, otp: e.target.value.replace(/\D/g, "") }))}
              className={`text-center text-lg tracking-widest ${errors.otp ? "border-destructive" : ""}`}
            />
            {errors.otp && <p className="text-sm text-destructive">{errors.otp}</p>}
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => setCurrentStep(1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Verifying...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Verify OTP
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </Button>
          </div>
        </form>
      )}

      {/* Step 3: Complete Profile */}
      {currentStep === 3 && (
        <form onSubmit={handleStep3Submit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address *
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={step3Data.email}
                onChange={(e) => setStep3Data((prev) => ({ ...prev, email: e.target.value }))}
                className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
              />
            </div>
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

           <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Set Password *
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={step3Data.password}
                onChange={(e) => setStep3Data((prev) => ({ ...prev, password: e.target.value }))}
                className={`pl-10 ${errors.password ? "border-destructive" : ""}`}
              />
            </div>
            {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="profilePicture" className="text-sm font-medium">
              Profile Picture (Optional)
            </Label>
            <div className="flex items-center gap-4">
              {step3Data.profilePreview && (
                <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
                  <img
                    src={step3Data.profilePreview || "/placeholder.svg"}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <Input
                  id="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className={errors.profilePicture ? "border-destructive" : ""}
                />
                <p className="text-xs text-muted-foreground mt-1">Max size: 5MB. Supported: JPG, PNG, GIF</p>
              </div>
            </div>
            {errors.profilePicture && <p className="text-sm text-destructive">{errors.profilePicture}</p>}
          </div>

          {errors.submit && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm text-destructive">{errors.submit}</p>
            </div>
          )}

          <div className="flex gap-3">
            <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => setCurrentStep(2)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button type="submit" className="flex-1" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating Account...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Create Account
                  <CheckCircle className="h-4 w-4" />
                </div>
              )}
            </Button>
          </div>
        </form>
      )}

      {/* Sign In Link */}
      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/signin" className="text-primary hover:underline font-medium">
            Sign in here
          </Link>
        </p>
      </div>

      {/* Trust Badge */}
      <div className="mt-8 p-4 bg-secondary/50 rounded-lg text-center">
        <p className="text-xs text-muted-foreground">
          🔒 Your information is secure and encrypted. We follow government data protection standards.
        </p>
      </div>
    </AuthLayout>
  )
}
