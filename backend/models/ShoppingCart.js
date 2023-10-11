import mongoose from 'mongoose'

const ShoppingCartSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    cartItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true,
      },
    ],
    total_price: {
      type: Number,
      required: true,
    },
    total_quantity: {
      type: Number,
      required: true,
    },
  },

  { timestamps: true }
)

export default mongoose.model('ShoppingCart', ShoppingCartSchema)
