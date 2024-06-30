import mongoose, { Schema } from "mongoose";
import jwt from 'jwt'
import bcrypt from 'bcrypt'

const UserSchema = mongoose.Schema({
  username: {
    type: Strting,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  email: {
    type: Strting,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  fullname: {
    type: Strting,
    required: true,
    trim: true,
    index: true,
  },
  avatar: {
    type: Strting,
    required: true,
  },
  coverImage: {
    type: String,
  },
  watchHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: "Video"
    }
  ],
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  refreshTokens: {
    type: String
  }
}, { timestamps: true });

// cant use arrow fuction as they do not have the access to this keyword
UserSchema.pre('save', async function (next) {
  if (!this.isModified("password")) next()
  this.password = bcrypt.hash(this.password, 10)
})

// creating our own methods 
UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign({
    _id: this._id,
    email: this.email,
    username: this.username,
    fullname: this.fullname
  }, process.env.JWT_SECRET, { expiresIN: process.env.JWT_SECRET_EXPIRY })
}

UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign({
    _id: this._id,
  }, process.env.REFRESH_TOKEN, { expiresIN: process.env.REFRESH_TOKEN_EXPIRY })
}

export const User = mongoose.model("User", UserSchema)
