"use client"
import { useState, useEffect } from "react"

export function LoadingIntro({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [currentText, setCurrentText] = useState(0)

  const loadingTexts = [
    "Empowering Farmers through Fisheries...",
    "Building Ponds, Supplying Machines...",
    "Providing Fish Feed & Medicines...",
    "Helping Farmers Grow More & Earn More...",
  ]

  useEffect(() => {
    // Complete after 2 seconds total
    const completeTimeout = setTimeout(onComplete, 2000)
    
    // Progress animation (0-100% in 2 seconds)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 4 // Faster progression to reach 100% in 2 seconds
      })
    }, 80) // Adjusted interval for smoother progress

    // Text rotation (change every 0.5 seconds)
    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % loadingTexts.length)
    }, 500)

    return () => {
      clearInterval(progressInterval)
      clearInterval(textInterval)
      clearTimeout(completeTimeout)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900 to-teal-800">
      {/* Simplified Content */}
      <div className="text-center max-w-md mx-auto p-6">
        {/* Simplified Logo */}
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg">
            <div className="text-3xl">🐟</div>
          </div>
        </div>

        {/* Company Name */}
        <h1 className="text-3xl font-bold text-white mb-2">
          Fisheries Business Solutions
        </h1>

        {/* Motto / Tagline */}
        <p className="text-blue-200 mb-6">
          "Helping Farmers Build, Grow & Prosper"
        </p>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-64 h-2 bg-white/20 rounded-full mx-auto overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-teal-400 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="mt-2 text-white/80 text-sm">{progress}%</div>
        </div>

        {/* Rotating Business Key Points */}
        <div className="h-8 flex items-center justify-center">
          <p className="text-blue-200 text-sm">
            {loadingTexts[currentText]}
          </p>
        </div>
      </div>
    </div>
  )
}