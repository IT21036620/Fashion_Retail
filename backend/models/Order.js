import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },

    cartComplete: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CartComplete',
      required: true,
    },
  },

  { timestamps: true }
)

export default mongoose.model('Order', OrderSchema)
