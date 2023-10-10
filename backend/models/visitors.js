import mongoose from 'mongoose'

const visitorSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Visitor', visitorSchema)
