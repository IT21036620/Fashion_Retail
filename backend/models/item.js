import mongoose from 'mongoose'

const ItemSchema = new mongoose.Schema(
  {
    item_name: {
      type: String,
      required: [true, 'must provide product name'],
      trim: true,
    },
    manufacturer: {
      type: String,
      required: [true, 'must provide manufacturer name'],
      trim: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    package_quantity: {
      type: Number,
      required: [true, 'must provide product package quantity'],
      min: [1, 'package must contain at least 1 product, got {VALUE}'],
    },
    price: {
      type: Number,
      required: [true, 'must provide product price'],
      min: [
        0,
        'product price should be more than 0, {VALUE} is not greater than 0',
      ],
    },
    shipping_weight: {
      type: String,
      required: [true, 'must provide product package shipping weight'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'must provide product category'],
      trim: true,
      enum: {
        values: [
          'Supplements and Herbs',
          'Sports',
          'Beauty',
          'Bath and Personal Care',
          'Grocery',
          'Home',
          'Medicine',
          'Pets',
          'Babies and Kids',
        ],
        message: '{VALUE} is not a valid category',
      },
    },
    description: {
      type: String,
      required: [true, 'must provide product description'],
      trim: true,
    },
    rating: {
      type: Number,
      default: 0.0,
      max: [5, 'rating cannot be higher than 5, {VALUE} is invalid'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    // createdBy: {
    //   type: mongoose.Types.ObjectId,
    //   ref: 'Seller',
    //   required: [true, 'Please provide seller'],
    // },
    image: {
      type: String,
      required: [true, 'Please provide png or jpg product images'],
    },
    rate_count: {
      type: Number,
      default: 0,
    },
    rate_aggregate: {
      type: Number,
      default: 0.0,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Item', ItemSchema)
