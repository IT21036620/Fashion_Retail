import express from 'express'
const router = express.Router()

import { makePayment } from '../controllers/payments.js'

// router.post('/', makePayment)

router.route('/').post(makePayment)
// router.route('/:id').get(getPayment)

export default router
