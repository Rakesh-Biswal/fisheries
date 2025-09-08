import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Users, FileText, TrendingUp, Shield } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-secondary/50 to-background overflow-hidden">
      {/* Animated gradient background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] bg-blue-400/20 rounded-full blur-3xl animate-pulse-medium"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-green-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight tracking-tight transform transition-all duration-700 hover:translate-x-2">
                Your Complete
                <span className="text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent drop-shadow-md">
                  {" "}Fisheries Business{" "}
                </span>
                Solution
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed transform transition-all duration-700 hover:translate-x-1">
                Navigate government schemes, manage your fisheries business, and grow with confidence. 
                We handle the paperwork, you focus on success.
              </p>
              <p className="text-lg text-muted-foreground transform transition-all duration-700 hover:translate-x-1">
                <span className="font-semibold text-primary">ଓଡ଼ିଆରେ:</span> ସରକାରୀ ଯୋଜନା, ବ୍ୟବସାୟ ପରିଚାଳନା ଏବଂ ସଫଳତା ପାଇଁ ଆମର ସମ୍ପୂର୍ଣ୍ଣ ସମାଧାନ
              </p>
            </div>

            {/* Call-to-action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/explore">
                <Button size="lg" className="relative w-full sm:w-auto px-6 py-3 font-semibold rounded-xl bg-gradient-to-r from-primary to-blue-600 shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                  Explore Schemes
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-500 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" size="lg" className="relative w-full sm:w-auto px-6 py-3 rounded-xl font-semibold border-2 hover:border-primary hover:text-primary transition-all duration-500 hover:shadow-lg hover:scale-105">
                  Start Your Journey
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4">
              {[
                { value: "500+", label: "Farmers Helped" },
                { value: "₹2Cr+", label: "Subsidies Secured" },
                { value: "50+", label: "Active Schemes" },
              ].map((stat, i) => (
                <div key={i} className="text-center transform transition-all duration-500 hover:scale-110">
                  <div className="text-2xl font-bold text-primary bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent drop-shadow-md">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="grid grid-cols-2 gap-6 perspective-1000">
            {[
              { icon: FileText, title: "Scheme Management", desc: "Complete application and documentation support" },
              { icon: TrendingUp, title: "Business Growth", desc: "Strategic guidance for sustainable expansion" },
              { icon: Shield, title: "Compliance Support", desc: "Stay compliant with all regulations" },
              { icon: Users, title: "Expert Guidance", desc: "24/7 support from industry experts" },
            ].map((feature, i) => (
              <Card key={i} className="group bg-white/70 dark:bg-gray-900/60 backdrop-blur-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 border border-white/20 rounded-2xl">
                <CardContent className="p-6 text-center">
                  <div className="relative">
                    <feature.icon className="h-12 w-12 text-primary mx-auto mb-4 transform transition-all duration-700 group-hover:scale-125 drop-shadow-lg" />
                    <div className="absolute inset-0 bg-primary/20 rounded-full scale-150 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Floating glowing particles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/40 rounded-full animate-float-glow shadow-lg shadow-primary/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${12 + Math.random() * 12}s`,
            }}
          ></div>
        ))}
      </div>
    </section>
  )
}
