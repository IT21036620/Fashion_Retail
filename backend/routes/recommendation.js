import express from 'express'
const router = express.Router()

import {
  getAllRecommendations,
  updateRecommendation,
} from '../controllers/recommendation.js'

router.route('/').get(getAllRecommendations)
router.route('/:id').patch(updateRecommendation)

export default router
