import Cart from '../models/cart.js'
import CartComplete from '../models/CartComplete.js'
import asyncWrapper from '../middleware/async.js'
import { createCustomError } from '../errors/custom-error.js'
import dotenv from 'dotenv'
dotenv.config()

// This is used to retriew all cart items
const getAllCartItems = asyncWrapper(async (req, res) => {
  const items = await Cart.find({})
    .sort({
      updatedAt: 1,
    })
    .populate('item')
  res.status(200).json({ items })
})

// This is used to add a single iteam (Product) to cart
const createCartItem = asyncWrapper(async (req, res) => {
  const item = await Cart.create(req.body)
  res.status(201).json({ item })
})

// Calculating the commision for order
const calculateCommission = (totalPrice) => {
  const commissionPercentage = process.env.COMMISSION
  const commission = totalPrice * commissionPercentage
  return commission
}

const generateCommission = asyncWrapper(async (req, res) => {
  const { totalPrice } = req.body
  const commission = calculateCommission(totalPrice)
  res.status(200).json({ commission })
})

// This is uesed for create cart record when tempory cart is delated after payment
const insertcartcompletedetails = asyncWrapper(async (req, res) => {
  const customer = req.body.customer

  // First, find all the items in the Cart that match the given userID
  const itemsInCart = await Cart.find({ customer: customer }).populate(
    'item',
    'price'
  )

  // Calculate the total price of all items in the Cart
  let totalPrice = 0
  for (let i = 0; i < itemsInCart.length; i++) {
    totalPrice += itemsInCart[i].item.price * itemsInCart[i].quantity
  }

  const itemsarray = itemsInCart.map((item) => ({
    item: item.item._id,
    quantity: item.quantity,
  }))

  // Create a new CartComplete item with the same userID and products as in the Cart
  const cartCompleteItem = new CartComplete({
    customer: customer,
    items: itemsarray,
    totalprice: parseInt(totalPrice),
  })

  // Save the new CartComplete item to the database
  await cartCompleteItem.save()
  const cart_id = cartCompleteItem._id
  // Delete all items in the Cart that match the given userID
  await Cart.deleteMany({ customer: customer })

  // Send the response
  res.status(201).json({ cart_id })
})

// This is used to retriew cart items that matches the loged userid
const getCartItemsbycusid = asyncWrapper(async (req, res, next) => {
  const { id: userId } = req.params
  const items = await Cart.find({ customer: userId })
    .populate('item')
    .populate('customer')

  if (!items) {
    return next(createCustomError(`No Cart item with id: ${userId}`, 404))
  }
  res.status(200).json({ items })
})

// This is used to retriew Complete cart items that matches the cartid
const getCompelteCartItemsbycartid = asyncWrapper(async (req, res, next) => {
  const { id: cartID } = req.params
  const items = await CartComplete.findOne({ _id: cartID })
    .populate({
      path: 'items',
      populate: {
        path: 'item',
      },
    })
    .populate('customer')

  if (!items) {
    return next(createCustomError(`No Cart with id: ${cartID}`, 404))
  }
  res.status(200).json({ items })
})

// This is used to update cart items
const updateCartItems = asyncWrapper(async (req, res) => {
  const { id: cartID } = req.params

  const item = await Cart.findOneAndUpdate({ _id: cartID }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!item) {
    return next(createCustomError(`No Order with this id: ${cartID}`, 404))
  }

  res.status(200).json({ item })
})

// This is used to delete single item from the cart
const deleteCartItem = asyncWrapper(async (req, res) => {
  const { id: cartID } = req.params
  const item = await Cart.findOneAndDelete({ _id: cartID })
  if (!item) {
    return next(createCustomError(`No Order with this id: ${cartID}`, 404))
  }

  res.status(200).json({ item })
})

// This is used to delete All item from the cart
const deleteAllCartItems = asyncWrapper(async (req, res) => {
  const result = await Cart.deleteMany({})
  if (result.deletedCount === 0) {
    return next(createCustomError(`No items found to delete.`, 404))
  }

  res.status(200).json({ message: 'All cart items deleted successfully.' })
})

export {
  getAllCartItems,
  createCartItem,
  updateCartItems,
  deleteCartItem,
  deleteAllCartItems,
  getCartItemsbycusid,
  insertcartcompletedetails,
  generateCommission,
  getCompelteCartItemsbycartid,
}
