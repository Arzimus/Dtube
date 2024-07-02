import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'


const app = express()

app.use(cors({
  origin: process.env.CORS_URI,
  credentials: true
}))

app.use(express.json({
  limit: "16kb",
}))

app.use(express.urlencoded({
  extended: true,
  limit: "16kb"
}))

app.use(express.static("public"))
app.use(cookieParser())

// routes

import userRouter from './routes/user.route.js'

app.use("/api/v1/user", userRouter)


export { app }