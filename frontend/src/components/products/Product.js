import React from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import axios from 'axios'

const handelrecommandation = (itemId) => {
  axios
    .patch(`http://localhost:4000/api/v1/item-reach/${itemId}`)
    .then((res) => {
      console.log(res.data.message)
    })
    .catch((err) => {
      alert(err.message)
    })
}

const Product = ({
  image,
  item_name,
  manufacturer,
  id,
  price,
  rating,
  rate_count,
}) => {
  return (
    <div class="w-[300px] h-[500px] mb-[40px] block rounded-lg bg-white  dark:bg-gray-800 hover:cursor-pointer hover:scale-110 ">
      <div class="relative">
        <a href="#">
          <img
            class="w-full h-[310px] rounded-t-lg"
            crossOrigin="anonymous"
            src={image}
            alt={item_name}
          />
        </a>

        <div class="absolute top-2 right-2 bg-green-100 text-green-800 text-xm font-semibold px-2.5 py-0.5 rounded flex items-center">
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-yellow-300 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>First star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          {rating}
        </div>
      </div>

      <div class="px-2 pt-2">
        <h5 class=" text-xl font-semibold tracking-tight text-gray dark:text-white uppercase">
          {manufacturer}, {item_name}
        </h5>
        <div class="flex items-center justify-between">
          <span class="text-xl font-bold text-gray-900 dark:text-white">
            LKR {price}.00
          </span>
          <Link
            class="hover:no-underline"
            to={`/item/${id}`}
            onClick={() => handelrecommandation(id)}
          >
            <div class="w-[125px] font-sans bg-[rgb(33,190,33)] hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
              View Details
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Product
