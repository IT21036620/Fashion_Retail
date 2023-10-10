import CartAbandonment from '../models/cartAbandonment.js'

const cartAnalysis = {
  async getCartAbandonmentStats(req, res) {
    try {
      const { startDate, endDate } = req.query

      // Calculate the total number of carts created during the specified time period
      const totalCartsCreated = await CartAbandonment.countDocuments({
        timestamp: { $gte: new Date(startDate), $lte: new Date(endDate) },
      })

      // Calculate the number of carts successfully purchased during the specified time period
      const totalCartsPurchased = 0

      // Calculate the number of carts abandoned during the specified time period
      const totalCartsAbandoned = totalCartsCreated - totalCartsPurchased

      // Calculate the abandonment rate as a percentage
      const abandonmentRate = (totalCartsAbandoned / totalCartsCreated) * 100

      res.json({
        totalCartsCreated,
        totalCartsPurchased,
        totalCartsAbandoned,
        abandonmentRate,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal server error.' })
    }
  },
}

export default cartAnalysis
