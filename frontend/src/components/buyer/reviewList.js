import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaStar } from 'react-icons/fa'

const ReviewList = ({ buyerId }) => {
  const [reviews, setReviews] = useState([])
  const [products, setProducts] = useState([])
  const [editing, setEditing] = useState(null)
  const [editedReview, setEditedReview] = useState({ rating: '', review: '' })

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3009/api/v1/reviews/buyer/${buyerId}`
        )
        setReviews(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchReviews()
  }, [buyerId])

  useEffect(() => {
    const fetchProductDetails = async () => {
      for (const review of reviews) {
        const { productId } = review
        if (!products[productId]) {
          try {
            console.log(productId)
            const response = await axios.get(
              `http://localhost:3002/api/buyer/searchProduct/${productId}`
            )
            setProducts((prevState) => ({
              ...prevState,
              [productId]: response.data,
            }))
            console.log(response.data.data)
          } catch (error) {
            console.log(error)
          }
        }
      }
    }

    if (reviews.length > 0) {
      fetchProductDetails()
    }
  }, [reviews])
  //   useEffect(() => {
  //     const fetchProductDetails = async () => {
  //       const productDetailsPromises = []

  //       for (const review of reviews) {
  //         const { productId } = review
  //         if (!products[productId]) {
  //           const fetchProduct = axios.get(
  //             `http://localhost:4000/api/buyer/searchProduct/${productId}`
  //           )
  //           productDetailsPromises.push(fetchProduct)
  //         }
  //       }

  //       try {
  //         const productDetailsResponses = await Promise.all(
  //           productDetailsPromises
  //         )
  //         const newProducts = productDetailsResponses.reduce(
  //           (accumulator, currentResponse) => {
  //             const product = currentResponse.data.data
  //             accumulator[product._id] = product
  //             return accumulator
  //           },
  //           {}
  //         )

  //         setProducts((prevState) => ({ ...prevState, ...newProducts }))
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     }

  //     if (reviews.length > 0) {
  //       fetchProductDetails()
  //     }
  //   }, [reviews])

  const handleEdit = (review) => {
    setEditing(review._id)
    setEditedReview({ rating: review.rating, review: review.review })
  }

  const handleUpdateReview = async (reviewId) => {
    try {
      await axios.put(
        `http://localhost:3009/api/v1/reviews/${reviewId}`,
        editedReview
      )
      setEditing(null)
      const updatedReviews = reviews.map((review) =>
        review._id === reviewId ? { ...review, ...editedReview } : review
      )
      setReviews(updatedReviews)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-gray-50 p-4 rounded-lg mx-20 px-20">
      <h2 className="text-xl font-bold mb-4">Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="border-b border-gray-300 mb-2 pb-2">
            {editing === review._id ? (
              <>
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-2" />
                  <input
                    type="number"
                    value={editedReview.rating}
                    min="0"
                    max="10"
                    onChange={(e) =>
                      setEditedReview({
                        ...editedReview,
                        rating: e.target.value,
                      })
                    }
                    className="border rounded w-16"
                  />
                </div>
                <div className="mt-2">
                  <textarea
                    value={editedReview.review}
                    onChange={(e) =>
                      setEditedReview({
                        ...editedReview,
                        review: e.target.value,
                      })
                    }
                    className="border rounded w-full h-20"
                  ></textarea>
                </div>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => handleUpdateReview(review._id)}
                    className="bg-green-400 text-gray-600 py-1 px-4 rounded hover:bg-green-600 mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="bg-gray-400 text-gray-600 py-1 px-4 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-2" />
                  <div className="font-bold">{review.rating}/10</div>
                </div>
                <div className="text-gray-600">{review.review}</div>
                <div className="text-right">
                  <button
                    onClick={() => handleEdit(review)}
                    className="bg-blue-400 text-gray-600 py-1 px-4 rounded hover:bg-blue-600 mt-2"
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
            {products[review.productId] && (
              <div className="mt-2">
                <h3 className="text-lg font-bold">
                  Product Name
                  {products[review.productId].product_name}
                </h3>
                <img
                  src={products[review.productId].image}
                  alt={products[review.productId].product_name}
                  className="w-24 h-24 object-cover mt-2"
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-600">No reviews yet.</p>
      )}
    </div>
  )
}

export default ReviewList
