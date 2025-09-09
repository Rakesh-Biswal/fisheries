import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import connectDB from "@/lib/db"
import User from "@/lib/models/user"
import { uploadToR2 } from "@/lib/cloudflare-r2"

export async function POST(request) {
  try {
    const formData = await request.formData()

    const email = formData.get("email")
    const password = formData.get("password")
    const fullName = formData.get("fullName")
    const phone = formData.get("phone")
    const profilePicture = formData.get("profilePicture")

    // Validate required fields
    if (!email || !password || !fullName || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate phone format
    const phoneRegex = /^(\+91)?[6-9]\d{9}$/
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({ error: "Invalid phone number format" }, { status: 400 })
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 })
    }

    await connectDB()

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { phone }],
    })

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        return NextResponse.json({ error: "User already exists with this email" }, { status: 400 })
      }
      if (existingUser.phone === phone) {
        return NextResponse.json({ error: "User already exists with this phone number" }, { status: 400 })
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Handle profile picture upload
    let profilePictureData = null
    if (profilePicture && profilePicture.size > 0) {
      try {
        const timestamp = Date.now()
        const fileExtension = profilePicture.name.split(".").pop()
        const fileName = `profiles/${timestamp}-${fullName.replace(/\s+/g, "-").toLowerCase()}.${fileExtension}`

        const buffer = Buffer.from(await profilePicture.arrayBuffer())
        const uploadResult = await uploadToR2(buffer, fileName, profilePicture.type)

        profilePictureData = {
          url: uploadResult.url,
          key: uploadResult.key,
          uploadedAt: new Date(),
        }
      } catch (uploadError) {
        console.error("[v0] Profile picture upload error:", uploadError)
        return NextResponse.json({ error: "Failed to upload profile picture" }, { status: 500 })
      }
    }

    // Create user
    const user = new User({
      fullName: fullName.trim(),
      email: email.toLowerCase(),
      phone: phone.startsWith("+91") ? phone : `+91${phone}`,
      password: hashedPassword,
      profilePicture: profilePictureData,
      isPhoneVerified: true, // Since we verified via Firebase OTP
      currentStatus: "active",
    })

    await user.save()

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
      message: "Account created successfully",
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
    console.error("[v0] Signup error:", error)

    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0]
      return NextResponse.json(
        {
          error: `User already exists with this ${field}`,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        error: "Failed to create account. Please try again.",
      },
      { status: 500 },
    )
  }
}