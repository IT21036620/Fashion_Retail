import express from 'express'
const router = express.Router()

import {
  getAllItemPurchase,
  getItemPurchaseById,
} from '../controllers/itemPurchase.js'

router.route('/').get(getAllItemPurchase)
router.route('/:id').get(getItemPurchaseById)

export default router
