import express from 'express'
const router = express.Router()

import {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from '../controllers/admin.js'

router.route('/').get(getAllAdmins).post(createAdmin)

router.route('/:id').patch(updateAdmin).delete(deleteAdmin).get(getAdminById)

export default router
