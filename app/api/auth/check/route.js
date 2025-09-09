import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function GET(request) {
  try {
    // Get the auth token from cookies
    const token = request.cookies.get(process.env.JWT_COOKIE_NAME || 'auth_token')?.value
    
    if (!token) {
      return NextResponse.json({ isAuthenticated: false })
    }

    // Verify the token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      return NextResponse.json({ 
        isAuthenticated: true,
        user: decoded 
      })
    } catch (error) {
      return NextResponse.json({ isAuthenticated: false })
    }
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ isAuthenticated: false })
  }
}