import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Users, FileText, TrendingUp, Shield } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-secondary/50 to-background overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-blue-300/10 rounded-full filter blur-3xl animate-pulse-medium"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-green-300/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight transform transition-all duration-700 hover:translate-x-2">
                Your Complete
                <span className="text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"> Fisheries Business </span>
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

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/explore">
                <Button size="lg" className="w-full sm:w-auto transform transition-all duration-500 hover:scale-105 hover:shadow-lg bg-gradient-to-r from-primary to-blue-600">
                  Explore Schemes
                  <ArrowRight className="ml-2 h-5 w-5 transform transition-transform duration-500 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" size="lg" className="w-full sm:w-auto transform transition-all duration-500 hover:scale-105 border-2">
                  Start Your Journey
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="text-center transform transition-all duration-500 hover:scale-110">
                <div className="text-2xl font-bold text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">500+</div>
                <div className="text-sm text-muted-foreground">Farmers Helped</div>
              </div>
              <div className="text-center transform transition-all duration-500 hover:scale-110">
                <div className="text-2xl font-bold text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">₹2Cr+</div>
                <div className="text-sm text-muted-foreground">Subsidies Secured</div>
              </div>
              <div className="text-center transform transition-all duration-500 hover:scale-110">
                <div className="text-2xl font-bold text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">50+</div>
                <div className="text-sm text-muted-foreground">Active Schemes</div>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards with 3D effect */}
          <div className="grid grid-cols-2 gap-4 perspective-1000">
            <Card className="hover:shadow-xl transition-all duration-500 hover:-translate-y-2 transform hover:rotate-x-2 hover:rotate-y-2 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="relative">
                  <FileText className="h-12 w-12 text-primary mx-auto mb-4 transform transition-all duration-700 hover:scale-110" />
                  <div className="absolute inset-0 bg-primary/10 rounded-full scale-150 blur-md opacity-0 transition-opacity duration-500 hover:opacity-100"></div>
                </div>
                <h3 className="font-semibold mb-2">Scheme Management</h3>
                <p className="text-sm text-muted-foreground">
                  Complete application and documentation support
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-500 hover:-translate-y-2 transform hover:-rotate-x-2 hover:rotate-y-2 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="relative">
                  <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4 transform transition-all duration-700 hover:scale-110" />
                  <div className="absolute inset-0 bg-primary/10 rounded-full scale-150 blur-md opacity-0 transition-opacity duration-500 hover:opacity-100"></div>
                </div>
                <h3 className="font-semibold mb-2">Business Growth</h3>
                <p className="text-sm text-muted-foreground">
                  Strategic guidance for sustainable expansion
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-500 hover:-translate-y-2 transform hover:rotate-x-2 hover:-rotate-y-2 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="relative">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4 transform transition-all duration-700 hover:scale-110" />
                  <div className="absolute inset-0 bg-primary/10 rounded-full scale-150 blur-md opacity-0 transition-opacity duration-500 hover:opacity-100"></div>
                </div>
                <h3 className="font-semibold mb-2">Compliance Support</h3>
                <p className="text-sm text-muted-foreground">
                  Stay compliant with all regulations
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-500 hover:-translate-y-2 transform hover:-rotate-x-2 hover:-rotate-y-2 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="relative">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4 transform transition-all duration-700 hover:scale-110" />
                  <div className="absolute inset-0 bg-primary/10 rounded-full scale-150 blur-md opacity-0 transition-opacity duration-500 hover:opacity-100"></div>
                </div>
                <h3 className="font-semibold mb-2">Expert Guidance</h3>
                <p className="text-sm text-muted-foreground">
                  24/7 support from industry experts
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating particles for 3D effect */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          ></div>
        ))}
      </div>
    </section>
  )
}