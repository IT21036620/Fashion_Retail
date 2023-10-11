import Customer from '../models/Customer.js'
import asyncWrapper from '../middleware/async.js'
import { createCustomError } from '../errors/custom-error.js'

// This is used to get all customers
const getAllCustomers = asyncWrapper(async (req, res) => {
  const customers = await Customer.find({})
  res.status(200).json({ customers, count: customers.length })
})

// This is used to add a new customer
const createCustomer = asyncWrapper(async (req, res) => {
  const customer = await Customer.create(req.body)
  res.status(201).json({ customer })
})

// This is used to retriew customer by id
const getCustomerById = asyncWrapper(async (req, res, next) => {
  const { id: userId } = req.params
  const customer = await Customer.find({ _id: userId })

  if (!customer) {
    return next(createCustomError(`No customer with id: ${userId}`, 404))
  }
  res.status(200).json({ customer })
})

// This is used to update customer by id
const updateCustomer = asyncWrapper(async (req, res) => {
  const { id: userId } = req.params

  const customer = await Customer.findOneAndUpdate({ _id: userId }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!customer) {
    return next(createCustomError(`No customer with this id: ${userId}`, 404))
  }

  res.status(200).json({ customer })
})

// This is used to delete single admin
const deleteCustomer = asyncWrapper(async (req, res) => {
  const { id: userId } = req.params
  const customer = await Customer.findOneAndDelete({ _id: userId })
  if (!customer) {
    return next(createCustomError(`No customer with this id: ${userId}`, 404))
  }

  res.status(200).json({ customer })
})

export {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerById,
}
