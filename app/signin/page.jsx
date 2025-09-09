"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthLayout } from "@/components/auth-layout"
import { Phone, ArrowRight, ArrowLeft } from "lucide-react"
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

export default function SignInPage() {
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [formData, setFormData] = useState({
    phone: "",
    otp: "",
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null)
  const [confirmationResult, setConfirmationResult] = useState(null)

  useEffect(() => {
    // Initialize reCAPTCHA verifier
    if (typeof window !== "undefined") {
      const verifier = new RecaptchaVerifier(auth, "recaptcha-container-signin", {
        size: "invisible",
        callback: () => {
          console.log("reCAPTCHA solved")
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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validatePhone = () => {
    const newErrors = {}
    
    if (!formData.phone) {
      newErrors.phone = "Phone number is required"
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateOtp = () => {
    const newErrors = {}
    
    if (!formData.otp || formData.otp.length !== 6) {
      newErrors.otp = "Please enter a valid 6-digit OTP"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSendOtp = async (e) => {
    e.preventDefault()
    
    if (!validatePhone()) return

    setIsLoading(true)

    try {
      const phoneNumber = `+91${formData.phone}`

      if (!recaptchaVerifier) {
        throw new Error("reCAPTCHA not initialized")
      }

      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
      setConfirmationResult(confirmation)
      setIsOtpSent(true)
      console.log("OTP sent successfully")
    } catch (error) {
      console.error("Error sending OTP:", error)
      setErrors({ phone: error.message || "Failed to send OTP. Please try again." })

      // Reset reCAPTCHA on error
      if (recaptchaVerifier) {
        recaptchaVerifier.clear()
        const newVerifier = new RecaptchaVerifier(auth, "recaptcha-container-signin", {
          size: "invisible",
          callback: () => {
            console.log("reCAPTCHA solved")
          },
        })
        setRecaptchaVerifier(newVerifier)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    
    if (!validateOtp()) return

    setIsLoading(true)

    try {
      const result = await confirmationResult.confirm(formData.otp)
      console.log("Phone verified successfully:", result.user.uid)
      
      // Now call our backend API to complete the sign-in
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: `+91${formData.phone}`,
          firebaseUid: result.user.uid,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Redirect to dashboard or home page
        window.location.href = "/dashboard"
      } else {
        setErrors({ submit: data.error || "Failed to sign in" })
      }
    } catch (error) {
      console.error("Error verifying OTP:", error)
      setErrors({ otp: "Invalid OTP. Please check and try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToPhone = () => {
    setIsOtpSent(false)
    setFormData((prev) => ({ ...prev, otp: "" }))
    setErrors({})
  }

  return (
    <AuthLayout
      title="Welcome Back"
      titleOdia="ସ୍ୱାଗତମ୍"
      subtitle={isOtpSent ? "Enter the OTP sent to your phone" : "Sign in with your phone number"}
    >
      {/* reCAPTCHA container */}
      <div id="recaptcha-container-signin"></div>

      <form onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp} className="space-y-6">
        {!isOtpSent ? (
          /* Phone Input */
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
            <p className="text-xs text-muted-foreground">
              We'll send an OTP to verify your phone number
            </p>
          </div>
        ) : (
          /* OTP Input */
          <>
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground">
                OTP sent to <strong>+91{formData.phone}</strong>
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-sm font-medium">
                Enter OTP
              </Label>
              <Input
                id="otp"
                type="text"
                value={formData.otp}
                onChange={(e) => handleInputChange("otp", e.target.value.replace(/\D/g, ""))}
                className={`text-center text-lg tracking-widest h-11 ${errors.otp ? "border-destructive" : ""}`}
                maxLength={6}
              />
              {errors.otp && <p className="text-sm text-destructive">{errors.otp}</p>}
            </div>

            <button
              type="button"
              onClick={handleBackToPhone}
              className="text-sm text-primary hover:underline"
            >
              ← Change phone number
            </button>
          </>
        )}

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full h-11" 
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              {isOtpSent ? "Verifying..." : "Sending OTP..."}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {isOtpSent ? "Verify OTP" : "Send OTP"}
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