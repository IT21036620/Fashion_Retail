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
    price: {
      type: Number,
      required: [true, 'must provide product price'],
      min: [
        0,
        'product price should be more than 0, {VALUE} is not greater than 0',
      ],
    },
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
    description: {
      type: String,
      required: [true, 'must provide item description'],
      trim: true,
    },
    clothing_type: {
      type: String,
      required: [true, 'must provide item type'],
      trim: true,
      enum: {
        values: ['Men', 'Women', 'Unisex'],
        message: '{VALUE} is not a valid type',
      },
    },
    size: {
      type: String,
      required: [true, 'must provide item size'],
      trim: true,
      enum: {
        values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'],
        message: '{VALUE} is not a valid type',
      },
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
    cost: {
      type: Number,
      required: [false, 'must provide item cost'],
      min: [
        0,
        'item cost should be more than 0, {VALUE} is not greater than 0',
      ],
    },
    available_quantity: {
      type: Number,
      required: [false, 'must provide product price'],
      min: [
        0,
        'available quantity should be more than 0, {VALUE} is not greater than 0',
      ],
    },
  },
  { timestamps: true }
)

export default mongoose.model('Item', ItemSchema)
