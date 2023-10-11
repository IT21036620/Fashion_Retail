import express from 'express'
const router = express.Router()

import {
  createCategoryReach,
  updateCategoryReach,
  getAllCategoryReach,
  getCategoryReachByCategory,
} from '../controllers/categoryReach.js'

router.route('/').get(getAllCategoryReach).post(createCategoryReach)
router.route('/:id').patch(updateCategoryReach).get(getCategoryReachByCategory)

export default router
