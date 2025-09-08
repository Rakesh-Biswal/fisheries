import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    // Basic Information
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: /^(\+91)?[6-9]\d{9}$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },

    // Profile Information
    profilePicture: {
      url: String,
      key: String, // Cloudflare R2 key for deletion
      uploadedAt: Date,
    },

    // Account Status & Metadata
    currentStatus: {
      type: String,
      enum: ["active", "inactive", "suspended", "pending_verification"],
      default: "active",
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    // Preferences
    language: {
      type: String,
      enum: ["en", "or"],
      default: "en",
    },
    subscribeUpdates: {
      type: Boolean,
      default: true,
    },

    // Firebase Integration
    firebaseUid: {
      type: String,
      sparse: true, // Allow null values but ensure uniqueness when present
    },

    // Timestamps
    joinDate: {
      type: Date,
      default: Date.now,
    },
    lastLoginAt: Date,
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

// Update the updatedAt field before saving
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

// Indexes for better performance
userSchema.index({ email: 1 })
userSchema.index({ phone: 1 })
userSchema.index({ currentStatus: 1 })
userSchema.index({ firebaseUid: 1 })

export default mongoose.models.User || mongoose.model("User", userSchema)
