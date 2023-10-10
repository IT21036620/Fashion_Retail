import express from 'express'
const router = express.Router()
import { trackVisitor, getVisitorCount } from '../services/siteVisits.js'
import cartAnalysis from '../services/cart_abandonment_Service.js'

// Apply the trackVisitor middleware to specific routes
router.use(trackVisitor)

// Define the route to get visitor count
router.get('/visitor-count', getVisitorCount)
//router.get('/cart-abandonment-stats', cartAnalysis)

export default router
