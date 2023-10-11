import ShoppingCart from '../models/ShoppingCart.js'
import asyncWrapper from '../middleware/async.js'
import { createCustomError } from '../errors/custom-error.js'
import dotenv from 'dotenv'
dotenv.config()

// This is used to retriew all cart items
const getAllShoppingCarts = asyncWrapper(async (req, res) => {
  const shoppingCart = await ShoppingCart.find({})
    .sort({
      updatedAt: 1,
    })
    .populate('customer')
    .populate('cartItem')
  res.status(200).json({ shoppingCart })
})

// This is used to add a single iteam (Product) to cart
const createCartItem = asyncWrapper(async (req, res) => {
  const shoppingCart = await ShoppingCart.create(req.body)
  await shoppingCart.populate('customer cartItem').execPopulate()
  res.status(201).json({ shoppingCart })
})

export { getAllShoppingCarts, createCartItem }
