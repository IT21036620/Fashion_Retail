import TotalSales from '../models/TotalSales.js'
import asyncWrapper from '../middleware/async.js'
import { createCustomError } from '../errors/custom-error.js'

// This is used to get total sales
const getAllTotalSales = asyncWrapper(async (req, res) => {
  const total_sales = await TotalSales.find({})
  res.status(200).json({ total_sales, count: total_sales.length })
})

// This is used to add total sales
const createTotalSales = asyncWrapper(async (req, res) => {
  const total_sales = await TotalSales.create(req.body)
  res.status(201).json({ total_sales })
})

export { getAllTotalSales, createTotalSales }
