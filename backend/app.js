import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import xss from 'xss-clean'
import rateLimiter from 'express-rate-limit'

import connectDB from './db/connect.js'

import itemRouter from './routes/item.js'
import cartRouter from './routes/cart.js'
import itemReachRouter from './routes/recommendation.js'
import customerRouter from './routes/customer.js'
import adminRouter from './routes/admin.js'
import analytics from './routes/analytics.js'
import categoryReachRouter from './routes/categoryReach.js'
import orderRouter from './routes/order.js'
import itemPurchaseRouter from './routes/itemPurchase.js'
import categoryPurchaseRouter from './routes/categoryPurchase.js'
import shoppingCartRouter from './routes/shoppingCart.js'
import totalSalesRouter from './routes/totalSales.js'

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
app.use('/api/v1/item-reach', itemReachRouter)
app.use('/api/v1/customer', customerRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/analytics', analytics)
app.use('/api/v1/category-reach', categoryReachRouter)
app.use('/api/v1/order', orderRouter)
app.use('/api/v1/item-purchase', itemPurchaseRouter)
app.use('/api/v1/category-purchase', categoryPurchaseRouter)
app.use('/api/v1/shoppingCart', shoppingCartRouter)
app.use('/api/v1/totalSales', totalSalesRouter)

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
