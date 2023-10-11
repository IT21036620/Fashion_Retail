import mongoose from 'mongoose'

const ItemPurchaseSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true,
    },
    purchase_count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

export default mongoose.model('ItemPurchase', ItemPurchaseSchema)
