import React, { useEffect } from 'react'
import Loading from '../../components/products/Loading'
import { useParams } from 'react-router-dom'
import { Grid, Container, Typography } from '@mui/material'
// import './page.css'
import './sinProduct.css'
import { useGlobalContext } from './context'
import axios from 'axios'
import Navbar from '../../components/navbar'

const url = 'http://localhost:3008/api/v1/products/singleProduct/'

const SingleProduct = () => {
  const { id } = useParams()
  const [loading, setLoading] = React.useState(false)
  const [product, setProduct] = React.useState(null)

  React.useEffect(() => {
    setLoading(true)
    async function getProduct() {
      try {
        const response = await fetch(`${url}${id}`)
        const data = await response.json()
        console.log(data.product)
        // const data = response
        if (data.product) {
          const {
            availability: availability,
            rating: rating,
            product_name: product_name,
            manufacturer: manufacturer,
            package_quantity: package_quantity,
            price: price,
            mfd: mfd,
            exp: exp,
            shipping_weight: shipping_weight,
            category: category,
            description: description,
            image: image,
            rate_count: rate_count,
            createdBy: createdBy,
          } = data.product

          const newProduct = {
            availability,
            rating,
            product_name,
            manufacturer,
            package_quantity,
            price,
            mfd,
            exp,
            shipping_weight,
            category,
            description,
            image,
            rate_count,
            createdBy,
          }
          setProduct(newProduct)
        } else {
          setProduct(null)
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    getProduct()
  }, [id])

  if (loading) {
    return <Loading />
  }
  if (!product) {
    return <h2 className="section-title">No Product to display</h2>
  }
  const {
    product_name,
    image,
    category,
    description,
    price,
    manufacturer,
    rating,
    rate_count,
    package_quantity,
    mfd,
    exp,
    shipping_weight,
    createdBy,
  } = product

  console.log(createdBy)

  // console.log(window.location.href.substring(0, 21))
  // console.log(window.location.port) //3000
  // console.log(window.location.protocol) // http:
  // console.log(window.location.hostname) //localhost

  const http = window.location.protocol
  const domain = window.location.hostname
  const port = window.location.port

  const urlll = `${http}\/\/${domain}:${port}\/`
  console.log(urlll)

  return (
    <div>
      <div class="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
        {/* <div class="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
        <img
          class="mt-[80px] w-[400px] h-[250px]"
          alt={product_name}
          src={image}
        />
        <img class="mt-6 w-[400px] h-[250px]" alt={product_name} src={image} />
      </div> */}
        <div class="md:flex items-center justify-center py-12 2xl:px-20 md:px-6 px-4">
          <img class="w-[600px]" alt={product_name} src={image} />
        </div>
        <div class="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
          <div class="border-b border-green-400 pb-6">
            <h1 class="mt-[20px] lg:text-3xl text-3xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-white mt-2">
              {product_name}
            </h1>
            <div class="mt-[20px] text-black dark:text-white">
              <i>"{description}"</i>
            </div>
          </div>
          <div class="py-4 border-b border-green-400 flex items-center justify-between">
            <p class="text-base leading-4 text-gray-800 dark:text-gray-300">
              Manufacturer
            </p>
            <div class="flex items-center justify-center">
              <p class="text-base leading-none text-gray-600 dark:text-gray-300">
                {manufacturer}
              </p>
            </div>
          </div>
          <div class="py-4 border-b border-green-400 flex items-center justify-between">
            <p class="text-base leading-4 text-gray-800 dark:text-gray-300">
              Category
            </p>
            <div class="flex items-center justify-center">
              <p class="text-base leading-none text-gray-600 dark:text-gray-300">
                {category}
              </p>
            </div>
          </div>
          <div class="py-4 border-b border-green-400 flex items-center justify-between">
            <p class="text-base leading-4 text-gray-800 dark:text-gray-300">
              Package Quantity
            </p>
            <div class="flex items-center justify-center">
              <p class="text-base leading-none text-gray-600 dark:text-gray-300">
                {package_quantity}
              </p>
            </div>
          </div>
          <div class="py-4 border-b border-green-400 flex items-center justify-between">
            <p class="text-base leading-4 text-gray-800 dark:text-gray-300">
              Shipping Weight
            </p>
            <div class="flex items-center justify-center">
              <p class="text-base leading-none text-gray-600 dark:text-gray-300">
                {shipping_weight}
              </p>
            </div>
          </div>
          <div class="py-4 border-b border-green-400 flex items-center justify-between">
            <p class="text-base leading-4 text-gray-800 dark:text-gray-300">
              Date First Available
            </p>
            <div class="flex items-center justify-center">
              <p class="text-base leading-none text-gray-600 dark:text-gray-300">
                {mfd.substring(0, 10)}
              </p>
            </div>
          </div>
          <div class="py-4 border-b border-green-400 flex items-center justify-between">
            <p class="text-base leading-4 text-gray-800 dark:text-gray-300">
              Best By
            </p>
            <div class="flex items-center justify-center">
              <p class="text-base leading-none text-gray-600 dark:text-gray-300">
                {exp.substring(0, 10)}
              </p>
            </div>
          </div>
          <div class="py-4 border-b border-green-400 flex items-center justify-between">
            <p class="text-base leading-4 text-gray-800 dark:text-gray-300">
              Product Rating
            </p>
            <div class="flex items-center justify-center">
              <p class="text-base leading-none text-gray-600 dark:text-gray-300">
                {rating}/5 ({rate_count})
              </p>
            </div>
          </div>
          <div class="py-4 border-b border-green-400 flex items-center justify-between">
            <p class="text-3xl leading-4 text-gray-800 dark:text-gray-300">
              <b>Price</b>
            </p>
            <div class="flex items-center justify-center">
              <p class="text-3xl leading-none text-gray-800 dark:text-gray-300">
                <b>LKR {price}.00</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SingleProduct
