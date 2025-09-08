import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, AlertCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

const schemes = [
  {
    id: 1,
    title: "Pradhan Mantri Matsya Sampada Yojana",
    titleOdia: "ପ୍ରଧାନମନ୍ତ୍ରୀ ମତ୍ସ୍ୟ ସମ୍ପଦ ଯୋଜନା",
    description: "Comprehensive scheme for fisheries development with up to ₹60 lakh subsidy",
    amount: "₹60,00,000",
    deadline: "2024-12-31",
    status: "live",
    applicants: 1250,
  },
  {
    id: 2,
    title: "Fish Farmer Development Agency Scheme",
    titleOdia: "ମତ୍ସ୍ୟଜୀବୀ ବିକାଶ ଏଜେନ୍ସି ଯୋଜନା",
    description: "Support for fish farming infrastructure and equipment",
    amount: "₹25,00,000",
    deadline: "2024-11-15",
    status: "expiring",
    applicants: 890,
  },
  {
    id: 3,
    title: "Integrated Fisheries Development Scheme",
    titleOdia: "ସମନ୍ବିତ ମତ୍ସ୍ୟ ବିକାଶ ଯୋଜନା",
    description: "End-to-end fisheries value chain development support",
    amount: "₹40,00,000",
    deadline: "2024-10-30",
    status: "expired",
    applicants: 650,
  },
]

const getStatusIcon = (status) => {
  switch (status) {
    case "live":
      return <CheckCircle className="h-4 w-4" />
    case "expiring":
      return <Clock className="h-4 w-4" />
    case "expired":
      return <AlertCircle className="h-4 w-4" />
    default:
      return null
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case "live":
      return "bg-green-100 text-green-800 border-green-200"
    case "expiring":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "expired":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export function SchemeOverview() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-primary/5 animate-gradient-x"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-100/20 to-primary/10 animate-pulse-slow"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 transform-gpu">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance relative inline-block transform-gpu hover:scale-105 transition-all duration-700 hover:rotate-1 perspective-1000">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-primary bg-clip-text text-transparent drop-shadow-lg">
              Available Government Schemes
            </span>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary to-blue-600 rounded-full shadow-lg animate-pulse"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-600/20 blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10"></span>
          </h2>
          <p className="text-xl text-muted-foreground text-pretty transition-all duration-700 hover:scale-105 hover:translate-y-1 transform-gpu">
            Discover and apply for fisheries schemes tailored for your business needs
          </p>
          <p className="text-lg text-muted-foreground mt-2 transition-all duration-500 hover:text-primary">
            <span className="font-semibold text-primary">ଓଡ଼ିଆରେ:</span> ଆପଣଙ୍କ ବ୍ୟବସାୟ ପାଇଁ ଉପଯୁକ୍ତ ମତ୍ସ୍ୟ ଯୋଜନା ଖୋଜନ୍ତୁ
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12" style={{ perspective: "1200px" }}>
          {schemes.map((scheme, index) => (
            <Card
              key={scheme.id}
              className="group relative transform-gpu transition-all duration-700 hover:scale-110 hover:-translate-y-6 hover:rotate-y-12 hover:rotate-x-3 bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl preserve-3d"
              style={{
                transformStyle: "preserve-3d",
                animationDelay: `${index * 150}ms`,
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 bg-gradient-to-br from-primary/10 via-blue-100/30 to-transparent rounded-2xl"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 bg-gradient-to-tr from-transparent via-white/20 to-primary/5 rounded-2xl"></div>

              <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700 animate-bounce"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-400/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse"></div>

              <CardHeader className="relative z-10 transform-gpu group-hover:translate-z-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge
                    variant="outline"
                    className={`${getStatusColor(scheme.status)} flex items-center gap-1 px-3 py-1 rounded-xl shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 transform-gpu`}
                  >
                    <span className="animate-pulse">{getStatusIcon(scheme.status)}</span>
                    {scheme.status.charAt(0).toUpperCase() + scheme.status.slice(1)}
                  </Badge>
                  <div className="text-right transform-gpu group-hover:scale-110 group-hover:-rotate-2 transition-all duration-500">
                    <div className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent drop-shadow-lg">
                      {scheme.amount}
                    </div>
                    <div className="text-xs text-muted-foreground">Max Subsidy</div>
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight group-hover:text-primary transition-all duration-700 transform-gpu group-hover:translate-x-2 group-hover:scale-105">
                  {scheme.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground font-medium italic transition-all duration-500 group-hover:text-primary/80">
                  {scheme.titleOdia}
                </p>
              </CardHeader>

              <CardContent className="relative z-10 transform-gpu group-hover:translate-z-2">
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed group-hover:translate-x-2 group-hover:text-gray-700 transition-all duration-700 transform-gpu">
                  {scheme.description}
                </p>

                <div className="space-y-3 group-hover:translate-x-1 transition-all duration-500 transform-gpu">
                  <div className="flex justify-between text-sm p-2 rounded-lg bg-gray-50/50 group-hover:bg-primary/5 transition-all duration-500">
                    <span className="text-muted-foreground">Deadline:</span>
                    <span className="font-medium">{new Date(scheme.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm p-2 rounded-lg bg-gray-50/50 group-hover:bg-primary/5 transition-all duration-500">
                    <span className="text-muted-foreground">Applicants:</span>
                    <span className="font-medium">{scheme.applicants.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 transition-all duration-700 hover:scale-110 hover:shadow-xl hover:-translate-y-1 hover:rotate-1 transform-gpu bg-white/80 backdrop-blur-sm border-2 hover:border-primary/50"
                  >
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 transition-all duration-700 hover:scale-110 hover:shadow-xl hover:-translate-y-1 hover:-rotate-1 transform-gpu !bg-gradient-to-r !from-primary !to-blue-600 !text-white hover:from-blue-600 hover:to-primary"
                    disabled={scheme.status === "expired"}
                  >
                    {scheme.status === "expired" ? "Expired" : "Apply Now"}
                  </Button>
                </div>
              </CardContent>

              <div className="absolute inset-0 -z-10 bg-black/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-8 scale-95"></div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/explore">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 rounded-2xl font-semibold border-2 transition-all duration-700 hover:scale-110 hover:border-primary hover:text-white hover:bg-gradient-to-r hover:from-primary hover:to-blue-600 hover:shadow-2xl hover:-translate-y-2 hover:rotate-1 transform-gpu bg-white/90 backdrop-blur-sm"
            >
              View All Schemes
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-500 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
