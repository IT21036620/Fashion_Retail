import express from 'express'
const router = express.Router()
import { trackVisitor, getVisitorCount } from '../services/siteVisits.js'

// Apply the trackVisitor middleware to specific routes
router.use(trackVisitor)

// Define the route to get visitor count
router.get('/visitor-count', getVisitorCount)

export default router
