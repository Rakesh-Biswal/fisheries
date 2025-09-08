import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Users, FileText, TrendingUp, Shield, Fish, Waves, Anchor } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-secondary/30 to-background overflow-hidden">
      {/* Enhanced 3D River Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* River base with 3D depth */}
        <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-blue-400/30 via-blue-300/20 to-transparent transform-gpu perspective-1000">
          {/* Multiple water layers for depth */}
          <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-blue-500/20 to-transparent animate-river-flow"></div>
          <div className="absolute bottom-0 w-full h-3/4 bg-gradient-to-t from-cyan-400/15 to-transparent animate-river-flow-slow"></div>

          {/* Animated water waves with 3D effect */}
          <div className="absolute bottom-0 left-0 w-[300%] h-32 bg-wave-pattern bg-[length:200px_60px] animate-wave-3d opacity-60"></div>
          <div className="absolute bottom-4 left-0 w-[250%] h-24 bg-wave-pattern bg-[length:150px_40px] animate-wave-3d-reverse opacity-40"></div>
          <div className="absolute bottom-8 left-0 w-[200%] h-16 bg-wave-pattern bg-[length:100px_30px] animate-wave-3d opacity-30"></div>

          {/* Water ripples */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border-2 border-blue-300/20 animate-ripple"
              style={{
                width: `${40 + i * 20}px`,
                height: `${40 + i * 20}px`,
                left: `${10 + i * 12}%`,
                bottom: `${20 + Math.sin(i) * 10}%`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${4 + i * 0.5}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Enhanced floating elements with 3D transforms */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl animate-float-3d-large"></div>
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-blue-300/10 rounded-full filter blur-3xl animate-float-3d-medium"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-green-300/10 rounded-full filter blur-3xl animate-float-3d-small"></div>
      </div>

      {/* Enhanced 3D Swimming Fish Animation */}
      <div className="absolute inset-0 overflow-hidden z-5">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-fish-swim-3d transform-gpu"
            style={{
              left: `${-10 + (i % 4) * 30}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 3}s`,
              animationDuration: `${25 + (i % 5) * 10}s`,
              transform: `rotateY(${i % 2 === 0 ? "0deg" : "180deg"}) rotateX(${Math.sin(i) * 15}deg)`,
            }}
          >
            <Fish
              className={`w-8 h-6 text-blue-500/40 transform transition-all duration-1000 hover:scale-150 hover:text-blue-600/60 ${
                i % 3 === 0 ? "animate-fish-wiggle" : i % 3 === 1 ? "animate-fish-dive" : "animate-fish-surface"
              }`}
              style={{
                filter: `hue-rotate(${i * 30}deg) brightness(${0.8 + (i % 3) * 0.2})`,
              }}
            />
            {/* Fish bubble trail */}
            <div className="absolute -right-2 top-1 w-1 h-1 bg-blue-200/60 rounded-full animate-bubble-trail"></div>
            <div className="absolute -right-4 top-0 w-0.5 h-0.5 bg-blue-100/40 rounded-full animate-bubble-trail-delayed"></div>
          </div>
        ))}

        {/* Large fish swimming across */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`large-${i}`}
            className="absolute animate-large-fish-swim transform-gpu"
            style={{
              left: "-15%",
              top: `${40 + i * 15}%`,
              animationDelay: `${i * 15}s`,
              animationDuration: "45s",
            }}
          >
            <Fish className="w-16 h-12 text-blue-600/30 transform rotate-45 animate-fish-wiggle-large" />
            <div className="absolute -right-3 top-2 w-2 h-2 bg-blue-300/40 rounded-full animate-bubble-large"></div>
          </div>
        ))}
      </div>

      {/* Underwater light rays */}
      <div className="absolute inset-0 overflow-hidden z-1">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-b from-yellow-200/10 to-transparent animate-light-ray transform-gpu"
            style={{
              width: "4px",
              height: "100%",
              left: `${15 + i * 15}%`,
              top: "0",
              animationDelay: `${i * 2}s`,
              animationDuration: `${8 + i * 2}s`,
              transform: `skewX(${10 + Math.sin(i) * 5}deg)`,
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content with enhanced 3D effects */}
          <div className="space-y-8 relative transform-gpu">
            {/* Enhanced decorative elements */}
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-primary/10 rounded-full filter blur-xl animate-float-3d-ping"></div>
            <div className="absolute bottom-10 -right-6 w-12 h-12 bg-blue-300/10 rounded-full filter blur-lg animate-pulse-3d"></div>

            <div className="space-y-4 relative transform-gpu perspective-1000">
              <div className="absolute -left-8 top-4 w-6 h-6 bg-primary rounded-full opacity-20 animate-pulse-3d"></div>
              <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight transform transition-all duration-700 hover:translate-x-2 hover:rotateY-5 transform-gpu">
                Your Complete
                <span className="text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent relative transform-gpu">
                  <Waves className="absolute -top-4 -left-6 w-8 h-8 text-blue-300/50 animate-wave-bob-3d" />
                  Fisheries Business
                  <Anchor className="absolute -bottom-4 -right-6 w-6 h-6 text-blue-400/60 animate-anchor-sway" />
                </span>
                Solution
              </h1>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed transform transition-all duration-700 hover:translate-x-1 hover:translate-z-4 transform-gpu">
                Navigate government schemes, manage your fisheries business, and grow with confidence. We handle the
                paperwork, you focus on success.
              </p>
              <p className="text-lg text-muted-foreground transform transition-all duration-700 hover:translate-x-1 transform-gpu">
                <span className="font-semibold text-primary">ଓଡ଼ିଆରେ:</span> ସରକାରୀ ଯୋଜନା, ବ୍ୟବସାୟ ପରିଚାଳନା ଏବଂ ସଫଳତା ପାଇଁ ଆମର
                ସମ୍ପୂର୍ଣ୍ଣ ସମାଧାନ
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 relative transform-gpu">
              <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-primary/10 rounded-full filter blur-lg animate-pulse-3d"></div>
              <Link href="/explore" className="group">
                <Button
                  size="lg"
                  className="w-full sm:w-auto transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:translate-z-8 bg-gradient-to-r from-primary to-blue-600 shadow-lg shadow-blue-500/30 transform-gpu"
                >
                  Explore Schemes
                  <ArrowRight className="ml-2 h-5 w-5 transform transition-transform duration-500 group-hover:translate-x-1 group-hover:rotateZ-12" />
                </Button>
              </Link>
              <Link href="/signup" className="group">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto transform transition-all duration-500 hover:scale-105 hover:translate-z-4 border-2 border-primary/50 hover:border-primary hover:bg-primary/5 transform-gpu bg-transparent"
                >
                  Start Your Journey
                </Button>
              </Link>
            </div>

            {/* Enhanced Trust Indicators */}
            <div className="flex items-center gap-6 pt-4">
              {[
                { value: "500+", label: "Farmers Helped" },
                { value: "₹2Cr+", label: "Subsidies Secured" },
                { value: "50+", label: "Active Schemes" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="text-center transform transition-all duration-500 hover:scale-110 hover:translate-z-6 group transform-gpu perspective-500"
                >
                  <div className="text-2xl font-bold text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent relative">
                    {item.value}
                    <div className="absolute -top-1 -right-2 w-2 h-2 bg-green-400 rounded-full group-hover:animate-ping-3d"></div>
                  </div>
                  <div className="text-sm text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Enhanced Feature Cards with advanced 3D effects */}
          <div className="grid grid-cols-2 gap-4 perspective-1000 transform-gpu">
            {[
              { icon: FileText, title: "Scheme Management", desc: "Complete application and documentation support" },
              { icon: TrendingUp, title: "Business Growth", desc: "Strategic guidance for sustainable expansion" },
              { icon: Shield, title: "Compliance Support", desc: "Stay compliant with all regulations" },
              { icon: Users, title: "Expert Guidance", desc: "24/7 support from industry experts" },
            ].map((item, index) => (
              <Card
                key={index}
                className="hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:translate-z-8 hover:rotateX-5 hover:rotateY-5 transform bg-white/90 backdrop-blur-md border border-white/20 relative overflow-hidden group transform-gpu"
                style={{
                  transformStyle: "preserve-3d",
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700 transform-gpu"></div>

                <CardContent className="p-6 text-center relative z-10">
                  <div className="relative inline-block transform-gpu">
                    <item.icon className="h-12 w-12 text-primary mx-auto mb-4 transform transition-all duration-700 group-hover:scale-110 group-hover:rotateY-180 group-hover:translate-z-4 transform-gpu" />
                    <div className="absolute inset-0 bg-primary/10 rounded-full scale-150 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <h3 className="font-semibold mb-2 text-foreground/90 transform transition-all duration-500 group-hover:translate-z-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground transform transition-all duration-500 group-hover:translate-z-1">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced floating particles with 3D depth */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-particle-3d transform-gpu"
            style={{
              width: `${2 + Math.random() * 8}px`,
              height: `${2 + Math.random() * 8}px`,
              background: `rgba(37, 99, 235, ${0.05 + Math.random() * 0.15})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${20 + Math.random() * 20}s`,
              transform: `translateZ(${Math.random() * 100}px)`,
            }}
          ></div>
        ))}
      </div>
    </section>
  )
}
