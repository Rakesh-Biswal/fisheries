"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SchemeFilters } from "@/components/scheme-filters"
import { SchemeCardDetailed } from "@/components/scheme-card-detailed"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpDown, Grid, List } from "lucide-react"

// Extended mock data for schemes
const allSchemes = [
  {
    id: 1,
    title: "Pradhan Mantri Matsya Sampada Yojana",
    titleOdia: "ପ୍ରଧାନମନ୍ତ୍ରୀ ମତ୍ସ୍ୟ ସମ୍ପଦ ଯୋଜନା",
    description:
      "Comprehensive scheme for fisheries development with infrastructure support, equipment subsidies, and training programs for sustainable aquaculture.",
    amount: "₹60,00,000",
    deadline: "2024-12-31",
    status: "live",
    applicants: 1250,
    maxApplicants: 5000,
    categories: ["Infrastructure", "High Subsidy", "Training"],
    processingTime: "45-60 days",
    keyBenefits: [
      "Up to 60% subsidy on infrastructure development",
      "Free technical training and certification",
      "Market linkage support for 3 years",
      "Insurance coverage included",
    ],
    eligibilityHighlights: ["Fisheries graduate", "Land ownership", "Age 18-60"],
  },
  {
    id: 2,
    title: "Fish Farmer Development Agency Scheme",
    titleOdia: "ମତ୍ସ୍ୟଜୀବୀ ବିକାଶ ଏଜେନ୍ସି ଯୋଜନା",
    description:
      "Support for fish farming infrastructure, pond development, and modern equipment procurement for small and medium fish farmers.",
    amount: "₹25,00,000",
    deadline: "2024-11-15",
    status: "expiring",
    applicants: 890,
    maxApplicants: 2000,
    categories: ["Equipment", "Quick Approval"],
    processingTime: "20-30 days",
    keyBenefits: [
      "50% subsidy on pond construction",
      "Equipment financing at 4% interest",
      "Technical support for 2 years",
      "Quality seed supply guarantee",
    ],
    eligibilityHighlights: ["Small farmer", "Pond area 0.5-5 acres", "No previous subsidy"],
  },
  {
    id: 3,
    title: "Integrated Fisheries Development Scheme",
    titleOdia: "ସମନ୍ବିତ ମତ୍ସ୍ୟ ବିକାଶ ଯୋଜନା",
    description:
      "End-to-end fisheries value chain development with processing units, cold storage, and marketing infrastructure support.",
    amount: "₹40,00,000",
    deadline: "2024-10-30",
    status: "expired",
    applicants: 650,
    maxApplicants: 1500,
    categories: ["Infrastructure", "Processing"],
    processingTime: "60-90 days",
    keyBenefits: [
      "Cold storage facility subsidy",
      "Processing equipment support",
      "Export certification assistance",
      "Branding and marketing support",
    ],
    eligibilityHighlights: ["Cooperative society", "Processing license", "Export potential"],
  },
  {
    id: 4,
    title: "Fisheries and Aquaculture Infrastructure Development Fund",
    titleOdia: "ମତ୍ସ୍ୟ ଏବଂ ଜଳଚାଷ ଭିତ୍ତିଭୂମି ବିକାଶ ପାଣ୍ଠି",
    description:
      "Large-scale infrastructure development for fisheries sector including hatcheries, feed mills, and research facilities.",
    amount: "₹2,00,00,000",
    deadline: "2025-03-31",
    status: "live",
    applicants: 45,
    maxApplicants: 100,
    categories: ["Infrastructure", "High Subsidy", "Research"],
    processingTime: "90-120 days",
    keyBenefits: [
      "Up to 70% project cost subsidy",
      "Technical expertise provided",
      "Research collaboration opportunities",
      "Long-term operational support",
    ],
    eligibilityHighlights: ["Registered company", "Technical expertise", "Large scale project"],
  },
  {
    id: 5,
    title: "Fisheries Training and Skill Development Program",
    titleOdia: "ମତ୍ସ୍ୟ ପ୍ରଶିକ୍ଷଣ ଏବଂ କୌଶଳ ବିକାଶ କାର୍ଯ୍ୟକ୍ରମ",
    description:
      "Comprehensive training program for modern aquaculture techniques, business management, and technology adoption.",
    amount: "₹5,00,000",
    deadline: "2024-12-15",
    status: "live",
    applicants: 2340,
    maxApplicants: 10000,
    categories: ["Training", "Quick Approval"],
    processingTime: "15-20 days",
    keyBenefits: [
      "Free certification courses",
      "Stipend during training period",
      "Job placement assistance",
      "Entrepreneurship development support",
    ],
    eligibilityHighlights: ["Age 18-45", "Basic education", "Interest in fisheries"],
  },
  {
    id: 6,
    title: "Women in Fisheries Empowerment Scheme",
    titleOdia: "ମତ୍ସ୍ୟ କ୍ଷେତ୍ରରେ ମହିଳା ସଶକ୍ତିକରଣ ଯୋଜନା",
    description:
      "Special scheme to promote women participation in fisheries sector with additional subsidies and support systems.",
    amount: "₹15,00,000",
    deadline: "2025-01-31",
    status: "live",
    applicants: 567,
    maxApplicants: 3000,
    categories: ["Women Empowerment", "Equipment", "Training"],
    processingTime: "25-35 days",
    keyBenefits: [
      "Additional 10% subsidy for women",
      "Childcare support during training",
      "Women-only technical sessions",
      "Flexible repayment options",
    ],
    eligibilityHighlights: ["Women applicant", "Age 21-55", "SHG membership preferred"],
  },
]

export default function ExplorePage() {
  const [filteredSchemes, setFilteredSchemes] = useState(allSchemes)
  const [viewMode, setViewMode] = useState("grid") // 'grid' or 'list'
  const [sortBy, setSortBy] = useState("deadline") // 'deadline', 'amount', 'applicants'

  const handleFilterChange = (activeFilters) => {
    let filtered = allSchemes

    if (activeFilters.length > 0) {
      filtered = allSchemes.filter((scheme) => {
        return activeFilters.some((filter) => {
          switch (filter) {
            case "live":
              return scheme.status === "live"
            case "expiring":
              return scheme.status === "expiring"
            case "expired":
              return scheme.status === "expired"
            case "high-subsidy":
              return Number.parseInt(scheme.amount.replace(/[₹,]/g, "")) >= 5000000
            case "quick-approval":
              return scheme.categories?.includes("Quick Approval")
            case "infrastructure":
              return scheme.categories?.includes("Infrastructure")
            case "equipment":
              return scheme.categories?.includes("Equipment")
            case "training":
              return scheme.categories?.includes("Training")
            default:
              return false
          }
        })
      })
    }

    setFilteredSchemes(filtered)
  }

  const handleSearchChange = (searchTerm) => {
    if (!searchTerm) {
      setFilteredSchemes(allSchemes)
      return
    }

    const filtered = allSchemes.filter(
      (scheme) =>
        scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.titleOdia.includes(searchTerm) ||
        scheme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.categories?.some((cat) => cat.toLowerCase().includes(searchTerm.toLowerCase())),
    )

    setFilteredSchemes(filtered)
  }

  const handleSort = (criteria) => {
    const sorted = [...filteredSchemes].sort((a, b) => {
      switch (criteria) {
        case "deadline":
          return new Date(a.deadline) - new Date(b.deadline)
        case "amount":
          return Number.parseInt(b.amount.replace(/[₹,]/g, "")) - Number.parseInt(a.amount.replace(/[₹,]/g, ""))
        case "applicants":
          return a.applicants - b.applicants
        default:
          return 0
      }
    })
    setFilteredSchemes(sorted)
    setSortBy(criteria)
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">Explore Government Schemes</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Discover and apply for fisheries schemes tailored for your business needs
          </p>
          <p className="text-lg text-muted-foreground mt-2">
            <span className="font-semibold text-primary">ଓଡ଼ିଆରେ:</span> ଆପଣଙ୍କ ବ୍ୟବସାୟ ପାଇଁ ଉପଯୁକ୍ତ ମତ୍ସ୍ୟ ଯୋଜନା ଖୋଜନ୍ତୁ ଏବଂ ଆବେଦନ
            କରନ୍ତୁ
          </p>
        </div>

        {/* Filters */}
        <SchemeFilters onFilterChange={handleFilterChange} onSearchChange={handleSearchChange} />

        {/* Results Header */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="font-semibold">{filteredSchemes.length} schemes found</h2>
                <p className="text-sm text-muted-foreground">Showing results based on your filters and search</p>
              </div>

              <div className="flex items-center gap-2">
                {/* Sort Options */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSort("deadline")}
                  className={sortBy === "deadline" ? "bg-primary text-primary-foreground" : ""}
                >
                  <ArrowUpDown className="h-4 w-4 mr-1" />
                  Deadline
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSort("amount")}
                  className={sortBy === "amount" ? "bg-primary text-primary-foreground" : ""}
                >
                  <ArrowUpDown className="h-4 w-4 mr-1" />
                  Amount
                </Button>

                {/* View Mode Toggle */}
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schemes Grid/List */}
        <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredSchemes.map((scheme) => (
            <SchemeCardDetailed key={scheme.id} scheme={scheme} />
          ))}
        </div>

        {/* No Results */}
        {filteredSchemes.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">No schemes found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search terms to find relevant schemes.
              </p>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Reset Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  )
}
