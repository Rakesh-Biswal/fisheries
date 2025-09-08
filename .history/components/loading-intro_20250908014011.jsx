"use client"

import { useState, useEffect } from "react"

export function LoadingIntro({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [currentText, setCurrentText] = useState(0)

  const loadingTexts = [
    "Initializing Fisheries Platform...",
    "Loading Government Schemes...",
    "Preparing Your Dashboard...",
    "Almost Ready...",
  ]

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(onComplete, 500) // Small delay before transitioning
          return 100
        }
        return prev + 2
      })
    }, 60) // Updates every 60ms for smooth animation

    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % loadingTexts.length)
    }, 800)

    return () => {
      clearInterval(progressInterval)
      clearInterval(textInterval)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-teal-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Fish Silhouettes */}
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

        {/* Water Ripples */}
        <div className="absolute inset-0 animate-pulse-slow">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-white/20 rounded-full animate-ping"></div>
          <div
            className="absolute top-3/4 right-1/4 w-24 h-24 border-2 border-white/15 rounded-full animate-ping"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-3/4 w-20 h-20 border-2 border-white/10 rounded-full animate-ping"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center transform-gpu perspective-1000">
        {/* 3D Logo/Icon */}
        <div className="mb-8 animate-spin-slow">
          <div className="relative w-24 h-24 mx-auto transform-gpu preserve-3d animate-rotate-y">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full shadow-2xl transform translate-z-4"></div>
            <div className="absolute inset-2 bg-gradient-to-r from-white to-blue-100 rounded-full flex items-center justify-center transform translate-z-8">
              <div className="text-2xl font-bold text-blue-600 animate-pulse">🐟</div>
            </div>
          </div>
        </div>

        {/* Company Name with 3D Effect */}
        <div className="mb-8 transform-gpu preserve-3d">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 transform hover:rotate-x-3 transition-transform duration-500">
            <span className="inline-block animate-bounce-slow" style={{ animationDelay: "0s" }}>
              F
            </span>
            <span className="inline-block animate-bounce-slow" style={{ animationDelay: "0.1s" }}>
              i
            </span>
            <span className="inline-block animate-bounce-slow" style={{ animationDelay: "0.2s" }}>
              s
            </span>
            <span className="inline-block animate-bounce-slow" style={{ animationDelay: "0.3s" }}>
              h
            </span>
            <span className="inline-block animate-bounce-slow" style={{ animationDelay: "0.4s" }}>
              e
            </span>
            <span className="inline-block animate-bounce-slow" style={{ animationDelay: "0.5s" }}>
              r
            </span>
            <span className="inline-block animate-bounce-slow" style={{ animationDelay: "0.6s" }}>
              i
            </span>
            <span className="inline-block animate-bounce-slow" style={{ animationDelay: "0.7s" }}>
              e
            </span>
            <span className="inline-block animate-bounce-slow" style={{ animationDelay: "0.8s" }}>
              s
            </span>
          </h1>
          <p className="text-xl text-blue-200 animate-fade-in-up">Business Solutions Platform</p>
        </div>

        {/* Progress Bar with 3D Effect */}
        <div className="mb-6 transform-gpu preserve-3d">
          <div className="w-80 h-3 bg-white/20 rounded-full mx-auto overflow-hidden shadow-inner transform hover:scale-105 transition-transform duration-300">
            <div
              className="h-full bg-gradient-to-r from-blue-400 via-teal-400 to-blue-500 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
          <div className="mt-2 text-white/80 font-medium">{progress}%</div>
        </div>

        {/* Loading Text with Typewriter Effect */}
        <div className="h-8 flex items-center justify-center">
          <p className="text-lg text-blue-200 animate-pulse transform hover:scale-105 transition-transform duration-300">
            {loadingTexts[currentText]}
          </p>
        </div>

        {/* 3D Floating Elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-teal-400/20 rounded-full blur-xl animate-float transform-gpu"></div>
        <div className="absolute -bottom-20 -right-20 w-32 h-32 bg-gradient-to-r from-teal-400/20 to-blue-400/20 rounded-full blur-xl animate-float-delayed transform-gpu"></div>
      </div>
    </div>
  )
}
