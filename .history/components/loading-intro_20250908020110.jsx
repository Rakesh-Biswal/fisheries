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
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 2
      })
    }, 60)

    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % loadingTexts.length)
    }, 1200)

    return () => {
      clearInterval(progressInterval)
      clearInterval(textInterval)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-teal-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Fish */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-slow opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              transform: `scale(${0.5 + Math.random() * 0.5})`,
            }}
          >
            <div className="w-16 h-8 bg-white rounded-full transform rotate-12 relative">
              <div className="absolute right-0 top-1/2 w-6 h-6 bg-white transform -translate-y-1/2 rotate-45 rounded-tl-full"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center transform-gpu perspective-1000">
        {/* 3D Logo/Icon */}
        <div className="mb-6 animate-spin-slow">
          <div className="relative w-24 h-24 mx-auto transform-gpu preserve-3d animate-rotate-y">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full shadow-2xl transform translate-z-4"></div>
            <div className="absolute inset-2 bg-gradient-to-r from-white to-blue-100 rounded-full flex items-center justify-center transform translate-z-8">
              <div className="text-3xl font-bold text-blue-600 animate-pulse">🐟</div>
            </div>
          </div>
        </div>

        {/* Company Name */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">
          Fisheries Business Solutions
        </h1>

        {/* Motto / Tagline */}
        <p className="text-lg md:text-2xl text-blue-200 italic mb-6 animate-fade-in-up">
          "Helping Farmers Build, Grow & Prosper"
        </p>

        {/* Progress Bar */}
        <div className="mb-6 transform-gpu preserve-3d">
          <div className="w-80 h-3 bg-white/20 rounded-full mx-auto overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-blue-400 via-teal-400 to-blue-500 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
          <div className="mt-2 text-white/80 font-medium">{progress}%</div>
        </div>

        {/* Rotating Business Key Points */}
        <div className="h-8 flex items-center justify-center">
          <p className="text-lg text-blue-200 animate-pulse">
            {loadingTexts[currentText]}
          </p>
        </div>
      </div>
    </div>
  )
}
