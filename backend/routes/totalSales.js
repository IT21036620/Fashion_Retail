import express from 'express'
const router = express.Router()

import {
  getAllTotalSales,
  createTotalSales,
} from '../controllers/totalSales.js'

router.route('/').get(getAllTotalSales).post(createTotalSales)

export default router
