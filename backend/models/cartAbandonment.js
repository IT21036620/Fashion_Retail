import mongoose from 'mongoose'

const cartAbandonmentSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  // Add other fields
})

const CartAbandonment = mongoose.model('CartAbandonment', cartAbandonmentSchema)

export default CartAbandonment
