import Order from '../models/Order.js'
import ItemPurchase from '../models/ItemPurchase.js'
import CategoryPurchase from '../models/CategoryPurchase.js'
import TotalSales from '../models/TotalSales.js'
import asyncWrapper from '../middleware/async.js'
import { createCustomError } from '../errors/custom-error.js'

// This is used to get all orders
const getAllOrders = asyncWrapper(async (req, res) => {
  const orders = await Order.find({})
    .populate({
      path: 'cartComplete',
      populate: {
        path: 'items.item',
      },
    })
    .populate('customer')
  res.status(200).json({ orders, count: orders.length })
})

// This is used to add a new order
const createOrder = asyncWrapper(async (req, res, next) => {
  try {
    const order = await Order.create(req.body)

    // Populate order and send the response
    await order.populate('cartComplete customer').execPopulate()

    const totalPrice = order.cartComplete.totalprice

    // Update the TotalSales object to increment total_sales by totalPrice
    const totalSalesUpdate = await TotalSales.findOneAndUpdate(
      { _id: '65270f87c2e60011341d78da' },
      { $inc: { total_sales: totalPrice } },
      { new: true, runValidators: true }
    )

    if (!totalSalesUpdate) {
      return next(
        createCustomError('Unable to update total_sales in TotalSales', 500)
      )
    }

    // // Increment item purchase count by purchase quantity
    // for (const cartItem of order.cartComplete.items.item) {
    //   const item = cartItem.item.id
    //   const quantity = cartItem.quantity

    //   try {
    //     await ItemPurchase.findOneAndUpdate(
    //       { item: item },
    //       { $inc: { purchase_count: quantity } },
    //       { new: true }
    //     )
    //   } catch (error) {
    //     console.error(error)
    //   }
    // }

    // // Increment category purchase count by purchase quantity
    // for (const cartItem of order.cartComplete.items.item) {
    //   const category = cartItem.item.category
    //   const quantity = cartItem.quantity

    //   try {
    //     await CategoryPurchase.findOneAndUpdate(
    //       { category: category },
    //       { $inc: { purchase_count: quantity } },
    //       { new: true }
    //     )
    //   } catch (error) {
    //     console.error(error)
    //   }
    // }

    res.status(201).json({ order })
  } catch (error) {
    console.error(error)
    return next(createCustomError('Unable to create order', 500))
  }
})

// This is used to retriew all orders by customer id
const getAllOrdersByCustomerId = asyncWrapper(async (req, res, next) => {
  const { id: userId } = req.params
  const orders = await Order.find({ customer: userId })
    .populate({
      path: 'cartComplete',
      populate: {
        path: 'items.item',
      },
    })
    .populate('customer')

  if (!orders) {
    return next(createCustomError(`No Orders with customer id: ${userId}`, 404))
  }
  res.status(200).json({ orders })
})

// This is used to retriew order by id
const getOrderById = asyncWrapper(async (req, res, next) => {
  const { id: orderId } = req.params
  const order = await Order.findById(orderId)
    .populate({
      path: 'cartComplete',
      populate: {
        path: 'items.item',
      },
    })
    .populate('customer')

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
