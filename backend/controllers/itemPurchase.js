import ItemPurchase from '../models/ItemPurchase.js'
import asyncWrapper from '../middleware/async.js'
import { createCustomError } from '../errors/custom-error.js'

// get all item purchase
const getAllItemPurchase = async (req, res, next) => {
  try {
    // get all item purchase and sort them by purchase_count in desc
    const itemPurchaseObject = await ItemPurchase.find().sort({
      purchase_count: -1,
    })

    if (itemPurchaseObject.length === 0) {
      return next(createCustomError(`No item purchase`, 404))
    }

    res.status(200).json({ itemPurchaseObject })
  } catch (error) {
    next(error)
  }
}

// get item purchase by item id
const getItemPurchaseById = asyncWrapper(async (req, res, next) => {
  const { id: item } = req.params
  const itemPurchaseObject = await ItemPurchase.findOne({
    item: item,
  })

  if (!itemPurchaseObject) {
    return next(createCustomError(`No ItemPurchase with id: ${item}`, 404))
  }
  res.status(200).json({ itemPurchaseObject })
})

export { getAllItemPurchase, getItemPurchaseById }
