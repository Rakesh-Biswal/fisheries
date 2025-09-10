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
     bgColor: "bg-green-50",
    pdf: "/pdfs/pmmsy.pdf", // 🔹 Local/public folder file
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
     bgColor: "bg-green-50",
    pdf: "https://example.com/fish-farmer-scheme.pdf", // 🔹 External PDF link
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
     bgColor: "bg-green-50",
    pdf: "/pdfs/ifds.pdf",
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
      return "bg-green-100 text-green-700 border-green-300"
    case "expiring":
      return "bg-yellow-100 text-yellow-700 border-yellow-300"
    case "expired":
      return "bg-red-100 text-red-700 border-red-300"
    default:
      return "bg-gray-100 text-gray-700 border-gray-300"
  }
}

export function SchemeOverview() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Government Fisheries Schemes
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Trusted subsidy and support programs for fish farmers
          </p>
          <p className="text-md text-gray-500 mt-1">
            <span className="font-semibold text-blue-700">ଓଡ଼ିଆରେ:</span> ଆପଣଙ୍କ ବ୍ୟବସାୟ ପାଇଁ ଉପଯୁକ୍ତ ମତ୍ସ୍ୟ ଯୋଜନା
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme) => (
            <Card
              key={scheme.id}
              className="relative border rounded-xl shadow-md bg-white overflow-hidden 
                         transition-all duration-500 hover:shadow-xl hover:border-blue-300 hover:bg-blue-50/20"
            >
              {/* Background image */}
              <div className="absolute inset-0 opacity-10 transition-all duration-500 group-hover:opacity-20">
                <img
                  src={scheme.backgroundImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative z-10">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge
                      variant="outline"
                      className={`${getStatusColor(scheme.status)} flex items-center gap-1 px-2.5 py-1 rounded-md text-sm transition-all duration-500 group-hover:scale-105`}
                    >
                      {getStatusIcon(scheme.status)}
                      {scheme.status.charAt(0).toUpperCase() + scheme.status.slice(1)}
                    </Badge>
                    <div className="text-right transition-all duration-500 group-hover:scale-105">
                      <div className="text-xl font-semibold text-blue-700">
                        {scheme.amount}
                      </div>
                      <div className="text-xs text-gray-500">Max Subsidy</div>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900 transition-colors duration-500 group-hover:text-blue-700">
                    {scheme.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600 italic">{scheme.titleOdia}</p>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-gray-700 mb-4">{scheme.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 rounded bg-gray-50 transition-colors duration-500 group-hover:bg-blue-50/50">
                      <span className="text-gray-600">Deadline:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(scheme.deadline).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-gray-50 transition-colors duration-500 group-hover:bg-blue-50/50">
                      <span className="text-gray-600">Applicants:</span>
                      <span className="font-medium text-gray-900">
                        {scheme.applicants.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    {/* PDF Link */}
                    <a
                      href={scheme.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-700 transition-all duration-500 hover:shadow-md"
                      >
                        View Details
                      </Button>
                    </a>
                    
                    <Button
                      size="sm"
                      className="flex-1 bg-blue-600 text-white hover:bg-blue-700 transition-all duration-500 hover:shadow-md"
                      disabled={scheme.status === "expired"}
                    >
                      {scheme.status === "expired" ? "Expired" : "Apply Now"}
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom Button */}
        <div className="text-center mt-12">
          <Link href="/explore">
            <Button
              size="lg"
              variant="outline"
              className="px-6 py-3 rounded-lg font-medium border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-700"
            >
              View All Schemes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
