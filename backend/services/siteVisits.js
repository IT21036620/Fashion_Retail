import Visitor from '../models/visitors.js'

export const trackVisitor = async (req, res, next) => {
  try {
    // Extract visitor information from the request
    const { ip } = req
    const userAgent = req.get('user-agent')

    // Create a new Visitor record
    const visitor = new Visitor({ ip, userAgent })
    await visitor.save()

    next()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error.' })
  }
}

// Controller function to get visitor count
export const getVisitorCount = async (req, res) => {
  try {
    const visitorCount = await Visitor.aggregate([
      {
        $group: {
          _id: '$ip',
        },
      },
    ]).exec()

    res.json({ count: visitorCount.length })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error.' })
  }
}
