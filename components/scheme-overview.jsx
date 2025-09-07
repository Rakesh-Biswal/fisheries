import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const schemes = [
  {
    id: 1,
    title: "Pradhan Mantri Matsya Sampada Yojana",
    titleOdia: "ପ୍ରଧାନମନ୍ତ୍ରୀ ମତ୍ସ୍ୟ ସମ୍ପଦ ଯୋଜନା",
    description: "Comprehensive scheme for fisheries development with up to ₹60 lakh subsidy",
    amount: "₹60,00,000",
    deadline: "2024-12-31",
    status: "live",
    applicants: 1250
  },
  {
    id: 2,
    title: "Fish Farmer Development Agency Scheme",
    titleOdia: "ମତ୍ସ୍ୟଜୀବୀ ବିକାଶ ଏଜେନ୍ସି ଯୋଜନା",
    description: "Support for fish farming infrastructure and equipment",
    amount: "₹25,00,000",
    deadline: "2024-11-15",
    status: "expiring",
    applicants: 890
  },
  {
    id: 3,
    title: "Integrated Fisheries Development Scheme",
    titleOdia: "ସମନ୍ବିତ ମତ୍ସ୍ୟ ବିକାଶ ଯୋଜନା",
    description: "End-to-end fisheries value chain development support",
    amount: "₹40,00,000",
    deadline: "2024-10-30",
    status: "expired",
    applicants: 650
  }
]

const getStatusIcon = (status) => {
  switch (status) {
    case 'live':
      return <CheckCircle className="h-4 w-4" />
    case 'expiring':
      return <Clock className="h-4 w-4" />
    case 'expired':
      return <AlertCircle className="h-4 w-4" />
    default:
      return null
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case 'live':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'expiring':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'expired':
      return 'bg-red-100 text-red-800 border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

export function SchemeOverview() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">
            Available Government Schemes
          </h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Discover and apply for fisheries schemes tailored for your business needs
          </p>
          <p className="text-lg text-muted-foreground mt-2">
            <span className="font-semibold text-primary">ଓଡ଼ିଆରେ:</span> ଆପଣଙ୍କ ବ୍ୟବସାୟ ପାଇଁ ଉପଯୁକ୍ତ ମତ୍ସ୍ୟ ଯୋଜନା ଖୋଜନ୍ତୁ
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {schemes.map((scheme) => (
            <Card key={scheme.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge 
                    variant="outline" 
                    className={`${getStatusColor(scheme.status)} flex items-center gap-1`}
                  >
                    {getStatusIcon(scheme.status)}
                    {scheme.status.charAt(0).toUpperCase() + scheme.status.slice(1)}
                  </Badge>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{scheme.amount}</div>
                    <div className="text-xs text-muted-foreground">Max Subsidy</div>
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">
                  {scheme.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground font-medium">
                  {scheme.titleOdia}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {scheme.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Deadline:</span>
                    <span className="font-medium">{new Date(scheme.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Applicants:</span>
                    <span className="font-medium">{scheme.applicants.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1"
                    disabled={scheme.status === 'expired'}
                  >
                    {scheme.status === 'expired' ? 'Expired' : 'Apply Now'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/explore">
            <Button size="lg" variant="outline">
              View All Schemes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}