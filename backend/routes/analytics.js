import express from 'express'
const router = express.Router()
import { trackVisitor, getVisitorCount } from '../services/siteVisits.js'
import cartAnalysis from '../services/cart_abandonment_Service.js'
import predictCartAbandonment from '../services/abandonment_Prediction.js'

// Apply the trackVisitor middleware to specific routes
//router.use(trackVisitor)

// Define the route to get visitor count
router.get('/visitor-count', getVisitorCount)
//router.get('/cart-abandonment-stats', cartAnalysis)

router.post('/predictCA', (req, res) => {
    try {
        const cartData = req.body;
        const isAbandoned = predictCartAbandonment(cartData);
        res.json({ isAbandoned });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router
