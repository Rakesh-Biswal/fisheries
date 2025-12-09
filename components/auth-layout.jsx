import { Fish } from "lucide-react"
import Link from "next/link"
import { LanguageToggle } from "./language-toggle"
export function AuthLayout({ title, titleOdia, subtitle, children }) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {title}
            </h1>
            <p className="text-lg text-orange-600 font-medium mt-1">
              {titleOdia}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              {subtitle}
            </p>
          </div>

          {children}
        </div>
      </div>

      {/* Right side - Image/Background */}
      <div className="hidden lg:block flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500">
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-white p-8">
              <h2 className="text-4xl font-bold mb-4">Fisheries</h2>
              <p className="text-xl opacity-90">Your Digital Farming Companion</p>
              <div className="mt-8 text-sm opacity-75">
                <p>Empowering Farmers with Technology</p>
                <p className="mt-2">କୃଷକଙ୍କୁ ଟେକ୍ନୋଲୋଜି ସହିତ ସଶକ୍ତ କରିବା</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}