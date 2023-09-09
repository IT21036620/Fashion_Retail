import mongoose from 'mongoose'

const CartCompleteSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      // ref: 'User',
      required: true,
    },

    items: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Item',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],

    totalprice: {
      type: Number,
      required: true,
    },
  },

  { timestamps: true }
)

export default mongoose.model('CartComplete', CartCompleteSchema)
