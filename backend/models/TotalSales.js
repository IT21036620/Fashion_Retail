import mongoose from 'mongoose'

const TotalSalesSchema = new mongoose.Schema(
  {
    total_sales: {
      type: Number,
      required: true,
    },
  },

  { timestamps: true }
)

export default mongoose.model('TotalSales', TotalSalesSchema)
