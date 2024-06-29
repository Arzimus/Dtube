import { app } from './app.js'
import connectDB from './db/index.js'
import dotenv from 'dotenv'

const app = express()

dotenv.config({
  path: './env'
})

connectDB().
  then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server is running at port ${process.env.PORT}`)
    })
  })
  .catch((err) => {
    console.log(`MongoDb connection failed`, err)
  })
