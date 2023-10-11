import express from 'express'
const router = express.Router()

import {
  getAllShoppingCarts,
  createCartItem,
} from '../controllers/shoppingCart.js'

router.route('/').get(getAllShoppingCarts).post(createCartItem)

export default router
