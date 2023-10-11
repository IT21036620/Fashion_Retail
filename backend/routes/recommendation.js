import express from 'express'
const router = express.Router()

import {
  getAllRecommendations,
  updateRecommendation,
  getItemRechByItemId,
} from '../controllers/recommendation.js'

router.route('/').get(getAllRecommendations)
router.route('/:id').patch(updateRecommendation).get(getItemRechByItemId)

export default router
