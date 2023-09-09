import express from 'express'
const router = express.Router()

import {
  getAllItems,
  getItemByCategory,
  createItem,
  getItem,
  deleteItem,
  updateItem,
  changeItemRatingByID,
} from '../controllers/item.js'

// middleware for routes
// const authenticateSeller = require('../middleware/authentication')
// const upload = require('../middleware/upload')
import uploadMiddleware from '../middleware/cloudinary.js'

router
  .route('/')
  .get(getAllItems)
  .post(uploadMiddleware.single('image'), createItem)
router
  .route('/:id')
  .get(getItem)
  .patch(uploadMiddleware.single('image'), updateItem)
  .delete(deleteItem)
router.route('/itemRating/:id').patch(changeItemRatingByID)
router.route('/category/:id').get(getItemByCategory)

export default router
