import express from 'express'
const router = express.Router()

import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../controllers/customer.js'

router.route('/').get(getAllCustomers).post(createCustomer)

router
  .route('/:id')
  .patch(updateCustomer)
  .delete(deleteCustomer)
  .get(getCustomerById)

export default router
