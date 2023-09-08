import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaStar, FaEdit, FaTrash } from 'react-icons/fa'

const BuyerReviewList = ({ buyerId }) => {
  const [reviews, setReviews] = useState([])
  const [editReviewId, setEditReviewId] = useState(null)
  const [editReviewText, setEditReviewText] = useState('')

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3009/api/v1/reviews/buyer/${buyerId}`
      )
      const reviewData = await Promise.all(
        response.data.map(async (review) => {
          const productResponse = await axios.get(
            `http://localhost:3002/api/buyer/searchProduct/${review.productId}`
          )
          console.log(productResponse.data.data[0].product_name)
          return {
            ...review,
            productName: productResponse.data.data[0].product_name,
            productImage: productResponse.data.data[0].image,
          }
        })
      )
      setReviews(reviewData)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:3009/api/v1/reviews/${reviewId}`)
      setReviews(reviews.filter((review) => review._id !== reviewId))
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = (reviewId, reviewText) => {
    setEditReviewId(reviewId)
    setEditReviewText(reviewText)
  }

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3009/api/v1/reviews/${editReviewId}`, {
        review: editReviewText,
      })
      setReviews(
        reviews.map((review) =>
          review._id === editReviewId
            ? { ...review, review: editReviewText }
            : review
        )
      )
      setEditReviewId(null)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancel = () => {
    setEditReviewId(null)
  }

  useEffect(() => {
    fetchReviews()
  }, [buyerId])

  return (
    <div
      style={{ width: '60%', margin: '0 auto' }}
      className="bg-white rounded-lg shadow-lg p-6 mb-2"
    >
      <h2 className="text-3xl font-bold mb-4 mx-auto text-blue-400">Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="border-b border-gray-300 mb-4 pb-2">
            <div className="flex items-center">
              <img
                src={review.productImage}
                alt={review.productName}
                className="w-16 h-16 rounded mr-4"
              />
              <div className="text-lg font-bold">{review.productName}</div>
            </div>
            <div className="flex items-center mt-2">
              <FaStar className="text-yellow-400 mr-2" />
              <div className="font-bold">{review.rating}/10</div>
            </div>
            <div className="text-gray-600">
              {editReviewId === review._id ? (
                <input
                  type="text"
                  value={editReviewText}
                  onChange={(e) => setEditReviewText(e.target.value)}
                  className="border rounded mt-2 p-1 w-full"
                />
              ) : (
                review.review
              )}
            </div>
            <div className="mt-2">
              {editReviewId === review._id ? (
                <>
                  <button
                    onClick={handleSave}
                    className="text-sm text-blue-600 mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="text-sm text-gray-600"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEdit(review._id, review.review)}
                    className="text-sm text-blue-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="text-sm text-red-600"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No reviews yet.</p>
      )}
    </div>
  )
}

export default BuyerReviewList
