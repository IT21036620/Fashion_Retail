import mongoose from 'mongoose';

const ItemPerformanceSchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true,
    },
    completedPurchasesCount: {
      type: Number,
      default: 0,
    },
    addToCartCount: {
      type: Number,
      default: 0,
    },
    cartAbandonmentCount: {
      type: Number,
      default: 0,
    },
  }
);

export default mongoose.model('ItemPerformance', ItemPerformanceSchema);
