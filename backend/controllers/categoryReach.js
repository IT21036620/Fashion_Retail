import CategoryReach from '../models/CategoryReach.js'
import asyncWrapper from '../middleware/async.js'
import { createCustomError } from '../errors/custom-error.js'

//create a category reach
const createCategoryReach = asyncWrapper(async (req, res) => {
  const categoryReachObject = await CategoryReach.create(req.body)
  res.status(201).json({ categoryReachObject })
})

//using errors custom-error.js for createCustomError
//update category reach by category
const updateCategoryReach = asyncWrapper(async (req, res, next) => {
  const { id: category } = req.params

  const categoryReachObject = await CategoryReach.findOneAndUpdate(
    { category: category },
    { $inc: { reach_count: 1 } }, // Increment reach_count by 1
    { new: true }
  )
  if (!categoryReachObject) {
    return next(createCustomError(`No category with name: ${category}`, 404))
  }
  res.status(200).json({ categoryReachObject })
})

// get all category reach
const getAllCategoryReach = async (req, res, next) => {
  try {
    // get all category reach and sort them by reach_count in desc
    const categoryReachObject = await CategoryReach.find().sort({
      reach_count: -1,
    })

    if (categoryReachObject.length === 0) {
      return next(createCustomError(`No category reach`, 404))
    }

    res.status(200).json({ categoryReachObject })
  } catch (error) {
    next(error)
  }
}

// get category reach by name
const getCategoryReachByCategory = asyncWrapper(async (req, res, next) => {
  const { id: category } = req.params
  const categoryReachObject = await CategoryReach.findOne({
    category: category,
  })

  if (!categoryReachObject) {
    return next(createCustomError(`No CategoryReach with id: ${category}`, 404))
  }
  res.status(200).json({ categoryReachObject })
})

export {
  getAllCategoryReach,
  updateCategoryReach,
  createCategoryReach,
  getCategoryReachByCategory,
}
