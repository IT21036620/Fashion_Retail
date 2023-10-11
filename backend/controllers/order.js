import Order from '../models/Order.js'
import asyncWrapper from '../middleware/async.js'
import { createCustomError } from '../errors/custom-error.js'

// This is used to get all orders
const getAllOrders = asyncWrapper(async (req, res) => {
  const orders = await Order.find({})
  res.status(200).json({ orders, count: orders.length })
})

// This is used to add a new order
const createOrder = asyncWrapper(async (req, res) => {
  const order = await Order.create(req.body)
  res.status(201).json({ order })
})

// This is used to retriew all orders by customer id
const getAllOrdersByCustomerId = asyncWrapper(async (req, res, next) => {
  const { id: userId } = req.params
  const orders = await Order.find({ customer: userId })

  if (!orders) {
    return next(createCustomError(`No Orders with customer id: ${userId}`, 404))
  }
  res.status(200).json({ orders })
})

// This is used to retriew order by id
const getOrderById = asyncWrapper(async (req, res, next) => {
  const { id: orderId } = req.params
  const order = await Order.find({ _id: orderId })

  if (!order) {
    return next(createCustomError(`No Admin with id: ${orderId}`, 404))
  }
  res.status(200).json({ order })
})

// This is used to delete single order
const deleteOrder = asyncWrapper(async (req, res) => {
  const { id: orderId } = req.params
  const order = await Order.findOneAndDelete({ _id: orderId })
  if (!order) {
    return next(createCustomError(`No Order with this id: ${orderId}`, 404))
  }

  res.status(200).json({ order })
})

export {
  getAllOrders,
  createOrder,
  deleteOrder,
  getAllOrdersByCustomerId,
  getOrderById,
}
