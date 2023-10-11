import React, { useState } from 'react'
import axios from 'axios'
import { FaStar } from 'react-icons/fa'

const ReviewForm = ({ productId, buyerId }) => {
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:3009/api/v1/reviews/', {
        productId,
        buyerId,
        rating,
        review,
      })
      setSubmitted(true)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="w-full max-w-md bg-white rounded-lg overflow-hidden shadow-lg mb-2">
      <div className="p-4">
        <div className="text-gray-500 uppercase text-lg leading-normal">
          Give your feedback
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-4 relative">
            <div className="flex items-center mb-2">
              {[...Array(10)].map((star, i) => {
                const ratingValue = i + 1

                return (
                  <label key={i}>
                    <input
                      className="hidden"
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                    />
                    <FaStar
                      className="cursor-pointer"
                      size={20}
                      color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
                    />
                  </label>
                )
              })}
            </div>
            <textarea
              required
              className="w-full px-3 py-2 text-sm text-gray-700 border rounded-lg focus:outline-none"
              rows="4"
              placeholder="Write your review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
            <button
              type="submit"
              className="mt-3 text-sm block text-white transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800 w-full py-2"
            >
              Submit
            </button>
            {submitted && (
              <p className="mt-2 text-sm text-green-600">
                Thank you! Your review has been submitted.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReviewForm
