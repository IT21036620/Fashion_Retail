import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      // ref: 'User',
      required: true,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
  },

  { timestamps: true }
)

export default mongoose.model('Cart', CartSchema)
