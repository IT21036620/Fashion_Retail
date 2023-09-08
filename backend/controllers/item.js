import Item from '../models/item.js'
import Recommendation from '../models/recommendation.js'
import asyncWrapper from '../middleware/async.js'
import cloudinary from '../config/cloudinary.js'
import { createCustomError } from '../errors/custom-error.js'

//using errors custom-error.js for createCustomError
//get all items of a given category
const getItemByCategory = asyncWrapper(async (req, res, next) => {
  const { id: itemCat } = req.params
  const item = await Item.find({ category: itemCat }).exec()
  if (!item) {
    return next(createCustomError(`No item with category: ${itemCat}`, 404))
  }
  res.status(200).json({ item })
})

// create a new item with checking image file
const createItem = asyncWrapper(async (req, res) => {
  //   req.body.createdBy = req.user.userId
  const {
    item_name,
    manufacturer,
    price,
    category,
    description,
    clothing_type,
    size,
  } = req.body
  const file = req.file

  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'spm',
    })
    const image = result.secure_url

    const newItem = new Item({
      item_name,
      manufacturer,
      price,
      category,
      description,
      clothing_type,
      size,
      image: image, // Assign the single image URL directly
    })

    await newItem.save()
    res.json(newItem)

    // create a new recommendation with checking image file
    const item = newItem.id
    try {
      const newRecommendation = new Recommendation({
        item,
      })

      await newRecommendation.save()
    } catch (error) {
      console.error(error)
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Server error')
  }
})

//using errors custom-error.js for createCustomError
//get a item by id
const getItem = asyncWrapper(async (req, res, next) => {
  const { id: itemID } = req.params
  const item = await Item.findOne({ _id: itemID })

  if (!item) {
    return next(createCustomError(`No item with id: ${itemID}`, 404))
  }
  res.status(200).json({ item })
})

//using errors custom-error.js for createCustomError
//delete a item by id
const deleteItem = asyncWrapper(async (req, res, next) => {
  const { id: itemID } = req.params
  const item = await Item.findOneAndDelete({ _id: itemID })
  const recommendation = await Recommendation.findOneAndDelete({ item: itemID })
  if (!item) {
    return next(createCustomError(`No item with id: ${itemID}`, 404))
  }
  if (!recommendation) {
    return next(
      createCustomError(`No recommendation with item id: ${itemID}`, 404)
    )
  }
  res.status(200).json({ item })
})

//using errors custom-error.js for createCustomError
//update a item by id
const updateItem = asyncWrapper(async (req, res, next) => {
  const { id: itemID } = req.params

  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'spm',
    })
    req.body.image = result.secure_url
  }
  const item = await Item.findByIdAndUpdate({ _id: itemID }, req.body, {
    new: true,
  })
  if (!item) {
    return next(createCustomError(`No item with id: ${itemID}`, 404))
  }
  res.status(200).json({ item })
})

// get all items with search and sort options passed as a query in the req
const getAllItems = async (req, res) => {
  const {
    availability,
    manufacturer,
    item_name,
    category,
    clothing_type,
    size,
    sort,
    fields,
    numericFilters,
  } = req.query
  const queryObject = {}

  if (availability) {
    queryObject.availability = availability === 'true' ? true : false
  }

  if (manufacturer) {
    queryObject.manufacturer = { $regex: manufacturer, $options: 'i' }
  }

  if (item_name) {
    queryObject.item_name = { $regex: item_name, $options: 'i' }
  }

  if (category) {
    queryObject.category = category
  }

  if (clothing_type) {
    queryObject.clothing_type = clothing_type
  }

  if (size) {
    queryObject.size = size
  }

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    }
    const regEx = /\b(<|>|>=|=|<=)\b/g
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    )
    const options = ['price', 'rating']
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-')
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) }
      }
    })
  }

  console.log(queryObject)

  let result = Item.find(queryObject) // (req.query)
  // sort
  if (sort) {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
  } else {
    result = result.sort('createdAt')
  }

  if (fields) {
    const fieldList = fields.split(',').join(' ')
    result = result.select(fieldList)
  }

  const items = await result

  res.status(200).json({ items, nbHits: items.length }) //
}

//update item rating by id
const changeItemRatingByID = asyncWrapper(async (req, res, next) => {
  const { id: itemID } = req.params
  const item = await Item.findOneAndUpdate({ _id: itemID }, req.body.rating, {
    new: true,
    runValidators: true,
  })
  var changeRating = async function () {
    item.rating = req.body.rating
    item.rate_count = item.rate_count + 1
    item.rate_aggregate = item.rate_aggregate + item.rating
    var newRating = item.rate_aggregate / item.rate_count

    item.rating = parseFloat(newRating).toFixed(2) //newRating
    item.save()
  }
  changeRating()

  if (!item) {
    return next(createCustomError(`No item with id: ${itemID}`, 404))
  }
  res.status(200).json(`Rating successfully updated`)
})

export {
  getAllItems,
  getItemByCategory,
  createItem,
  getItem,
  deleteItem,
  updateItem,
  changeItemRatingByID,
}
