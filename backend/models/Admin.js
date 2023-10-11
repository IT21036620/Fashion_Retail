import mongoose from 'mongoose'

const AdminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'must provide first name'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'must provide last name'],
      trim: true,
    },
    contactNumber: {
      type: String,
      required: [true, 'must provide contact Number'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'must provide address'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'must provide password'],
    },
    role: {
      type: String,
      required: [true, 'must provide role'],
    },
  },
  { timestamps: true }
)

export default mongoose.model('Admin', AdminSchema)
