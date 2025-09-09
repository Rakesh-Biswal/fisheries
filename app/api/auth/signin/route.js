import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import connectDB from "@/lib/db"
import User from "@/lib/models/user"

export async function POST(request) {
  try {
    const { phone, firebaseUid } = await request.json()

    // Validate required fields
    if (!phone || !firebaseUid) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate phone format
    const phoneRegex = /^\+91[6-9]\d{9}$/
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({ error: "Invalid phone number format" }, { status: 400 })
    }

    await connectDB()

    // Find user by phone number
    const user = await User.findOne({ phone })
    
    if (!user) {
      return NextResponse.json({ error: "User not found. Please sign up first." }, { status: 404 })
    }

    // Check if user is active
    if (user.currentStatus !== "active") {
      return NextResponse.json({ error: "Account is not active. Please contact support." }, { status: 403 })
    }

    // Update last login time
    user.lastLogin = new Date()
    await user.save()

    // Remove password from response
    const { password: _, ...userResponse } = user.toObject()

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id.toString(),
        email: user.email,
        phone: user.phone
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    // Create response
    const response = NextResponse.json({
      success: true,
      message: "Sign in successful",
      user: userResponse,
    })

    // Set the JWT token as an HTTP-only cookie
    response.cookies.set({
      name: process.env.JWT_COOKIE_NAME || 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: '/',
    })

    return response
  } catch (error) {
    console.error("Signin error:", error)
    
    return NextResponse.json(
      {
        error: "Failed to sign in. Please try again.",
      },
      { status: 500 },
    )
  }
}