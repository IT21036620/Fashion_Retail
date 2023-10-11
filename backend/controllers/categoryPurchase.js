import CategoryPurchase from '../models/CategoryPurchase.js'
import asyncWrapper from '../middleware/async.js'
import { createCustomError } from '../errors/custom-error.js'

//create a category purchase
const createCategoryPurchase = asyncWrapper(async (req, res) => {
  const categoryPurchaseObject = await CategoryPurchase.create(req.body)
  res.status(201).json({ categoryPurchaseObject })
})

// get all category purchase
const getAllCategoryPurchase = async (req, res, next) => {
  try {
    // get all category purchase and sort them by purchase_count in desc
    const categoryPurchaseObject = await CategoryPurchase.find().sort({
      purchase_count: -1,
    })

    if (categoryPurchaseObject.length === 0) {
      return next(createCustomError(`No category purchase`, 404))
    }

    res.status(200).json({ categoryPurchaseObject })
  } catch (error) {
    next(error)
  }
}

// get category purchase by name
const getCategoryPurchaseByCategory = asyncWrapper(async (req, res, next) => {
  const { id: category } = req.params
  const categoryPurchaseObject = await CategoryPurchase.findOne({
    category: category,
  })

  if (!categoryPurchaseObject) {
    return next(
      createCustomError(`No CategoryPurchase with id: ${category}`, 404)
    )
  }
  res.status(200).json({ categoryPurchaseObject })
})

export {
  getAllCategoryPurchase,
  createCategoryPurchase,
  getCategoryPurchaseByCategory,
}
