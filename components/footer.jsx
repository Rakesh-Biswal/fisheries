import Link from 'next/link'
import { Fish, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Fish className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Fisheries Solution</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering Odisha's fisheries community with comprehensive business solutions and government scheme access.
            </p>
            <p className="text-muted-foreground text-sm">
              <span className="font-semibold text-primary">ଓଡ଼ିଆରେ:</span> ଓଡ଼ିଶାର ମତ୍ସ୍ୟଜୀବୀ ସମୁଦାୟକୁ ସଶକ୍ତ କରିବା
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/explore" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Explore Schemes
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                About Us
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Contact
              </Link>
              <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                FAQ
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold">Our Services</h3>
            <nav className="flex flex-col space-y-2">
              <span className="text-muted-foreground text-sm">Scheme Application</span>
              <span className="text-muted-foreground text-sm">Business Consultation</span>
              <span className="text-muted-foreground text-sm">Documentation Support</span>
              <span className="text-muted-foreground text-sm">Compliance Management</span>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                +91 98765 43210
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                support@fisheriessolution.com
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                Bhubaneswar, Odisha, India
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Fisheries Solution. All rights reserved. | Empowering Odisha's Fisheries Community</p>
        </div>
      </div>
    </footer>
  )
}