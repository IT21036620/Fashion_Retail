import mongoose from 'mongoose'

const CategoryReachSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, 'must provide item category'],
      trim: true,
      enum: {
        values: [
          'Tshirts',
          'Sports',
          'Shorts',
          'Plus Size',
          'Hoodies',
          'Jackets',
          'Pants',
          'Underwear',
          'Socks',
        ],
        message: '{VALUE} is not a valid category',
      },
    },
    reach_count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

export default mongoose.model('CategoryReach', CategoryReachSchema)
