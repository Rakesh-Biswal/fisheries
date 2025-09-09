import { NextResponse } from "next/server"

export async function POST() {
  try {
    const response = NextResponse.json({ 
      success: true, 
      message: "Signed out successfully" 
    })
    
    // Clear the auth cookie
    response.cookies.set({
      name: process.env.JWT_COOKIE_NAME || 'auth_token',
      value: '',
      expires: new Date(0),
      path: '/',
    })
    
    return response
  } catch (error) {
    console.error("Sign out error:", error)
    return NextResponse.json(
      { error: "Failed to sign out" },
      { status: 500 }
    )
  }
}