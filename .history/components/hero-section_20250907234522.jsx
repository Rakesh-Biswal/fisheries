import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Users, FileText, TrendingUp, Shield } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-secondary/50 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                Your Complete
                <span className="text-primary"> Fisheries Business </span>
                Solution
              </h1>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                Navigate government schemes, manage your fisheries business, and grow with confidence. 
                We handle the paperwork, you focus on success.
              </p>
              <p className="text-lg text-muted-foreground">
                <span className="font-semibold text-primary">ଓଡ଼ିଆରେ:</span> ସରକାରୀ ଯୋଜନା, ବ୍ୟବସାୟ ପରିଚାଳନା ଏବଂ ସଫଳତା ପାଇଁ ଆମର ସମ୍ପୂର୍ଣ୍ଣ ସମାଧାନ
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/explore">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore Schemes
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Start Your Journey
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Farmers Helped</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">₹2Cr+</div>
                <div className="text-sm text-muted-foreground">Subsidies Secured</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Active Schemes</div>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Scheme Management</h3>
                <p className="text-sm text-muted-foreground">
                  Complete application and documentation support
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Business Growth</h3>
                <p className="text-sm text-muted-foreground">
                  Strategic guidance for sustainable expansion
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Compliance Support</h3>
                <p className="text-sm text-muted-foreground">
                  Stay compliant with all regulations
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Expert Guidance</h3>
                <p className="text-sm text-muted-foreground">
                  24/7 support from industry experts
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}