import React from 'react'
import SellerProduct from '../Seller/SellerProduct'
import Loading from './Loading'
import { useGlobalContext } from '../../pages/seller/context'
import { Link } from 'react-router-dom'
import './product.css'
import axios from 'axios'

const id = '64399df40f08cb626892d7dd'
const sellerUrl = 'http://localhost:3008/api/v1/seller/'

const SellerProductList = () => {
  const { products, loading } = useGlobalContext()
  const [newSellerRating, setNewSellerRating] = React.useState('')
  const [sRateCount, setSRateCount] = React.useState('')
  const [sName, setSName] = React.useState('')

  if (loading) {
    return <Loading />
  }
  if (products.length < 1) {
    return <h2 className="section-title">No Products Posted Yet</h2>
  }

  const listItems = products.map((item) => (
    <SellerProduct key={item.id} {...item} />
  ))

  const fetchSeller = async () => {
    try {
      const response = await axios(`${sellerUrl}${id}`)
      console.log(response)
      setNewSellerRating(response.data.seller.rating)
      setSRateCount(response.data.seller.rate_count)
      setSName(response.data.seller.name)
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <div onLoad={fetchSeller}>
      <div class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
          {sName}, Welcome to AyurVeda
        </h5>
        <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
          You can manage any product you added by this account & You can add a
          new product and update your account by clicking the buttons below.
        </p>
        <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
          <Link
            to={`/seller/add-product`}
            class="w-[145px] mr-4 sm:w-auto bg-[rgb(33,190,33)] hover:bg-green-700 hover:no-underline focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
          >
            <div class="text-left">
              <div class="-mt-1 font-sans text-sm font-semibold">
                Add New Product
              </div>
            </div>
          </Link>
          <Link
            to={`/update/seller/${id}`}
            class="w-[145px] sm:w-auto bg-[rgb(33,190,33)] hover:bg-green-700 hover:no-underline focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
          >
            <div class="text-left">
              <div class="-mt-1 font-sans text-sm font-semibold">
                Update Account
              </div>
            </div>
          </Link>
        </div>
        <div class="mt-[30px] flex justify-center">
          <span class="bg-green-100 text-green-800 text-xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-800 ml-3">
            My Rating
          </span>
          <span class="font-bold text-xl dark:text-white ml-3">
            {newSellerRating}/5 ({sRateCount} ratings)
          </span>
        </div>
      </div>
      <div className="main_content">{listItems}</div>
    </div>
  )
}

export default SellerProductList
