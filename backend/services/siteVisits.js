import Visitor from '../models/visitors.js'

// Middleware to track visitors
export const trackVisitor = async (req, res, next) => {
  try {
    // Extract visitor information from the request
    const { ip } = req
    const userAgent = req.get('user-agent')

    // Create a new Visitor record
    const visitor = new Visitor({ ip, userAgent })
    await visitor.save()

    // Continue with the request
    next()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error.' })
  }
}

// Controller function to get visitor count
export const getVisitorCount = async (req, res) => {
  try {
    // Use MongoDB aggregation to count unique visitors
    const visitorCount = await Visitor.aggregate([
      {
        $group: {
          _id: '$ip', // Group by IP for unique visitors
        },
      },
    ]).exec()

    res.json({ count: visitorCount.length })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error.' })
  }
}
