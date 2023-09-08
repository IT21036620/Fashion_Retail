import Recommendation from '../models/recommendation.js'
import asyncWrapper from '../middleware/async.js'
import { createCustomError } from '../errors/custom-error.js'

//using errors custom-error.js for createCustomError
//update a recommendation by item id
const updateRecommendation = asyncWrapper(async (req, res, next) => {
  const { id: itemID } = req.params

  const recommendation = await Recommendation.findOneAndUpdate(
    { item: itemID },
    { $inc: { reach_count: 1 } }, // Increment reach_count by 1
    { new: true }
  )
  if (!recommendation) {
    return next(createCustomError(`No recommendation with id: ${itemID}`, 404))
  }
  res.status(200).json({ recommendation })
})

// get all recommendations
const getAllRecommendations = async (req, res, next) => {
  try {
    // get all recommendations and sort them by reach_count in desc
    const recommendations = await Recommendation.find().sort({
      reach_count: -1,
    })

    if (recommendations.length === 0) {
      return next(createCustomError(`No recommendations`, 404))
    }

    res.status(200).json({ recommendations })
  } catch (error) {
    next(error)
  }
}

export { getAllRecommendations, updateRecommendation }
