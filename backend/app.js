import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import xss from 'xss-clean'
import rateLimiter from 'express-rate-limit'

import connectDB from './db/connect.js'

import itemRouter from './routes/item.js'
import cartRouter from './routes/cart.js'
import recommendationRouter from './routes/recommendation.js'
import customerRouter from './routes/customer.js'
import adminRouter from './routes/admin.js'
import analytics from './routes/analytics.js'
import categoryReach from './routes/categoryReach.js'

import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

const app = express()

dotenv.config()

// Set up middleware and routes
app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
)
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())
app.use('/uploads', express.static('uploads'))

//console Client IP
// app.use((req, res, next) => {
//   const clientIP = req.ip
//   console.log(`Client IP: ${clientIP}`)
//   next()
// })

// Define your routes
app.use('/api/v1/items', itemRouter)
app.use('/api/v1/cart', cartRouter)
app.use('/api/v1/recommendations', recommendationRouter)
app.use('/api/v1/customer', customerRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/analytics', analytics)
app.use('/api/v1/category-reach', categoryReach)
// app.use('/api/v1/seller', sellerRouter)

// Error handling middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 4000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
