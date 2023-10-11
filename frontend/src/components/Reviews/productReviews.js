import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaStar } from 'react-icons/fa'

const ProductReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3009/api/v1/reviews/product/${productId}`
        )
        const reviewsWithBuyerNames = await Promise.all(
          response.data.map(async (review) => {
            const buyerResponse = await axios.get(
              `http://localhost:3002/api/buyer/getBuyer/${review.buyerId}`
            )
            console.log(buyerResponse.data.data.buyerName)
            console.log('check')
            return { ...review, buyerName: buyerResponse.data.data.buyerName }
          })
        )
        setReviews(reviewsWithBuyerNames)
      } catch (error) {
        console.error(error)
      }
    }

    fetchReviews()
  }, [productId])

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mb-2">
      <h2 className="text-xl font-bold mb-4 text-gray-600">Product Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="border-b border-gray-200 mb-4 pb-4">
            <div className="flex items-center mb-2">
              <FaStar className="text-yellow-400 mr-2" />
              <div className="font-bold text-indigo-500">
                {review.rating}/10
              </div>
            </div>
            <div className="text-gray-600">{review.review}</div>
            <div className="text-sm text-gray-400 mt-2">
              By: {review.buyerName}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No reviews yet.</p>
      )}
    </div>
  )
}

export default ProductReviewList
