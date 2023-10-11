import Admin from '../models/Admin.js'
import asyncWrapper from '../middleware/async.js'
import { createCustomError } from '../errors/custom-error.js'

// This is used to get all admins
const getAllAdmins = asyncWrapper(async (req, res) => {
  const admins = await Admin.find({})
  res.status(200).json({ admins, count: admins.length })
})

// This is used to add a new admin
const createAdmin = asyncWrapper(async (req, res) => {
  const admin = await Admin.create(req.body)
  res.status(201).json({ admin })
})

// This is used to retriew admin by id
const getAdminById = asyncWrapper(async (req, res, next) => {
  const { id: userId } = req.params
  const admin = await Admin.find({ _id: userId })

  if (!admin) {
    return next(createCustomError(`No Admin with id: ${userId}`, 404))
  }
  res.status(200).json({ admin })
})

// This is used to update admin by id
const updateAdmin = asyncWrapper(async (req, res) => {
  const { id: userId } = req.params

  const admin = await Admin.findOneAndUpdate({ _id: userId }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!admin) {
    return next(createCustomError(`No Admin with this id: ${userId}`, 404))
  }

  res.status(200).json({ admin })
})

// This is used to delete single admin
const deleteAdmin = asyncWrapper(async (req, res) => {
  const { id: userId } = req.params
  const admin = await Admin.findOneAndDelete({ _id: userId })
  if (!admin) {
    return next(createCustomError(`No Admin with this id: ${userId}`, 404))
  }

  res.status(200).json({ admin })
})

export { getAllAdmins, createAdmin, updateAdmin, deleteAdmin, getAdminById }
