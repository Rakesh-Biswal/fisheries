import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Users, FileText, TrendingUp, Shield, Fish, Waves, Anchor } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-secondary/30 to-background overflow-hidden">
      {/* Animated background elements with water effect */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-blue-300/10 rounded-full filter blur-3xl animate-pulse-medium"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-green-300/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        
        {/* Water wave animation */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-blue-200/20 to-transparent overflow-hidden">
          <div className="absolute -bottom-12 w-[200%] left-0 h-24 bg-wave-pattern bg-[length:100px_100px] animate-wave"></div>
          <div className="absolute -bottom-6 w-[200%] left-0 h-16 bg-wave-pattern bg-[length:120px_80px] opacity-70 animate-wave-slow"></div>
        </div>
      </div>

      {/* 3D floating fish animation */}
      <div className="absolute inset-0 overflow-hidden z-5">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-12 h-8 animate-float-3d"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${20 + i * 5}s`,
            }}
          >
            <Fish className="w-full h-full text-primary/40 transform rotate-45" />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 relative">
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-primary/10 rounded-full filter blur-xl animate-ping-slow"></div>
            <div className="absolute bottom-10 -right-6 w-12 h-12 bg-blue-300/10 rounded-full filter blur-lg animate-pulse"></div>
            
            <div className="space-y-4 relative">
              <div className="absolute -left-8 top-4 w-6 h-6 bg-primary rounded-full opacity-20 animate-pulse"></div>
              <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight transform transition-all duration-700 hover:translate-x-2">
                Your Complete
                <span className="text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent relative">
                  <Waves className="absolute -top-4 -left-6 w-8 h-8 text-blue-300/50 animate-bob" />
                  Fisheries Business
                  <Anchor className="absolute -bottom-4 -right-6 w-6 h-6 text-blue-400/60 animate-spin-slow" />
                </span>
                Solution
              </h1>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed transform transition-all duration-700 hover:translate-x-1">
                Navigate government schemes, manage your fisheries business, and grow with confidence. 
                We handle the paperwork, you focus on success.
              </p>
              <p className="text-lg text-muted-foreground transform transition-all duration-700 hover:translate-x-1">
                <span className="font-semibold text-primary">ଓଡ଼ିଆରେ:</span> ସରକାରୀ ଯୋଜନା, ବ୍ୟବସାୟ ପରିଚାଳନା ଏବଂ ସଫଳତା ପାଇଁ ଆମର ସମ୍ପୂର୍ଣ୍ଣ ସମାଧାନ
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 relative">
              <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-primary/10 rounded-full filter blur-lg animate-pulse"></div>
              <Link href="/explore" className="group">
                <Button size="lg" className="w-full sm:w-auto transform transition-all duration-500 hover:scale-105 hover:shadow-xl bg-gradient-to-r from-primary to-blue-600 shadow-lg shadow-blue-500/30">
                  Explore Schemes
                  <ArrowRight className="ml-2 h-5 w-5 transform transition-transform duration-500 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/signup" className="group">
                <Button variant="outline" size="lg" className="w-full sm:w-auto transform transition-all duration-500 hover:scale-105 border-2 border-primary/50 hover:border-primary hover:bg-primary/5">
                  Start Your Journey
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4">
              {[
                { value: "500+", label: "Farmers Helped" },
                { value: "₹2Cr+", label: "Subsidies Secured" },
                { value: "50+", label: "Active Schemes" }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="text-center transform transition-all duration-500 hover:scale-110 group"
                >
                  <div className="text-2xl font-bold text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent relative">
                    {item.value}
                    <div className="absolute -top-1 -right-2 w-2 h-2 bg-green-400 rounded-full group-hover:animate-ping"></div>
                  </div>
                  <div className="text-sm text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Enhanced Feature Cards with 3D effect */}
          <div className="grid grid-cols-2 gap-4 perspective-1000">
            {[
              { icon: FileText, title: "Scheme Management", desc: "Complete application and documentation support" },
              { icon: TrendingUp, title: "Business Growth", desc: "Strategic guidance for sustainable expansion" },
              { icon: Shield, title: "Compliance Support", desc: "Stay compliant with all regulations" },
              { icon: Users, title: "Expert Guidance", desc: "24/7 support from industry experts" }
            ].map((item, index) => (
              <Card 
                key={index}
                className="hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 transform hover:rotate-x-2 hover:rotate-y-2 bg-white/90 backdrop-blur-md border border-white/20 relative overflow-hidden group"
                style={{ 
                  transformStyle: 'preserve-3d',
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                
                <CardContent className="p-6 text-center relative z-10">
                  <div className="relative inline-block">
                    <item.icon className="h-12 w-12 text-primary mx-auto mb-4 transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-12" />
                    <div className="absolute inset-0 bg-primary/10 rounded-full scale-150 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <h3 className="font-semibold mb-2 text-foreground/90">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced floating particles for 3D effect */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float-3d"
            style={{
              width: `${4 + Math.random() * 6}px`,
              height: `${4 + Math.random() * 6}px`,
              background: `rgba(37, 99, 235, ${0.1 + Math.random() * 0.2})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 15}s`,
            }}
          ></div>
        ))}
      </div>
    </section>
  )
}