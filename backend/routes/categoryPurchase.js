import express from 'express'
const router = express.Router()

import {
  createCategoryPurchase,
  getAllCategoryPurchase,
  getCategoryPurchaseByCategory,
} from '../controllers/categoryPurchase.js'

router.route('/').get(getAllCategoryPurchase).post(createCategoryPurchase)
router.route('/:id').get(getCategoryPurchaseByCategory)

export default router
