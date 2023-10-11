import express from 'express'
const router = express.Router()

import {
  getAllOrders,
  getOrderById,
  getAllOrdersByCustomerId,
  createOrder,
  deleteOrder,
} from '../controllers/order.js'

router.route('/').get(getAllOrders).post(createOrder)
router.route('/:id').delete(deleteOrder).get(getOrderById)
router.route('/customer/:id').get(getAllOrdersByCustomerId)

export default router
