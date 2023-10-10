import Item from '../models/item.js'

// Function to analyze item performance
const analyzeItemPerformance = async (itemId) => {
  try {
    const item = await Item.findById(itemId)

    if (!item) {
      throw new Error('Item not found')
    }

    const { reach_count, addToCart_count, purchased_count } = item

    // Defining criteria for identifying underperforming items
    let isUnderperforming = false
    if (
      addToCart_count === 0 ||
      (reach_count > 0 && addToCart_count / reach_count < 0.1)
    ) {
      isUnderperforming = true
    }

    // add more conditions

    return {
      itemId: item._id,
      name: item.name,
      reach_count,
      addToCart_count,
      purchased_count,
      isUnderperforming,
    }
  } catch (error) {
    throw error
  }
}

export { analyzeItemPerformance }
