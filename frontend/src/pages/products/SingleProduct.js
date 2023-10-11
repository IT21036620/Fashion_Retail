import React, { useEffect } from 'react'
import Loading from '../../components/products/Loading'
import { useParams, Link } from 'react-router-dom'
import { Grid, Button, Container, Typography, Input } from '@mui/material'
import { FaShoppingCart } from 'react-icons/fa'
import './sinProduct.css'
import { useGlobalContext } from './context'
import axios from 'axios'
import Navbar from '../../components/navbar'
import ReviewForm from '../../components/Reviews/createReviews'
import ProductReviewList from '../../components/Reviews/productReviews'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const url = 'http://localhost:4000/api/v1/items/'
const productRating = 'localhost:4000/api/v1/items/productRating/'
const sellerRating = 'http://localhost:3008/api/v1/seller/sellerRating/'
const sellerUrl = 'http://localhost:3008/api/v1/seller/'
const cartUrl = 'http://localhost:4000/api/v1/cart'

const createMarkup = (text) => {
  return { __html: text }
}

const SingleProduct = () => {
  const { id } = useParams()
  const [loading, setLoading] = React.useState(false)
  const [product, setProduct] = React.useState(null)
  const [quantity, setQuantity] = React.useState(1)
  const [newRating, setNewRating] = React.useState('')
  const [rate_seller, setRate_seller] = React.useState('')
  const [newSellerRating, setNewSellerRating] = React.useState('')
  const [sRateCount, setSRateCount] = React.useState('')

  React.useEffect(() => {
    setLoading(true)
    async function getProduct() {
      try {
        const response = await fetch(`${url}${id}`)
        const data = await response.json()
        //console.log(data.product)
        // const data = response
        if (data.item) {
          const {
            availability: availability,
            rating: rating,
            item_name: item_name,
            manufacturer: manufacturer,
            price: price,
            category: category,
            description: description,
            image: image,
            rate_count: rate_count,
            rate_aggregate: rate_aggregate,
          } = data.item

          const newProduct = {
            availability,
            rating,
            item_name,
            manufacturer,
            price,
            category,
            description,
            image,
            rate_count,
            rate_aggregate,
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
    item_name,
    image,
    category,
    description,
    price,
    manufacturer,
    rating,
    rate_count,
    rate_aggregate,
  } = product

  // console.log(createdBy)

  const inputProps = {
    min: 1,
    max: 5,
  }

  const rateProduct = () => {
    axios
      .patch(`${productRating}${id}`, {
        rating: newRating,
      })
      .then(({ data }) => {
        console.log(data)
      })
  }

  // const rateSeller = () => {
  //   axios
  //     .patch(`${sellerRating}${createdBy}`, {
  //       rating: rate_seller,
  //     })
  //     .then(({ data }) => {
  //       console.log(data)
  //     })
  // }

  // const fetchSeller = async () => {
  //   try {
  //     const response = await axios(`${sellerUrl}${createdBy}`)
  //     console.log(response)
  //     setNewSellerRating(response.data.seller.rating)
  //     setSRateCount(response.data.seller.rate_count)
  //   } catch (error) {
  //     console.log(error.response)
  //   }
  // }

  // console.log(window.location.href.substring(0, 21))
  // console.log(window.location.port) //3000
  // console.log(window.location.protocol) // http:
  // console.log(window.location.hostname) //localhost

  const http = window.location.protocol
  const domain = window.location.hostname
  const port = window.location.port

  const urlll = `${http}\/\/${domain}:${port}\/`
  console.log(urlll)

  const handleQuantity = (param) => {
    if (param === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1)
    }
    if (param === 'increase' && quantity < 25) {
      setQuantity(quantity + 1)
    }
  }

  const addToCart = async (e) => {
    e.preventDefault()
    const totPrice = price * quantity
    try {
      const resp = await axios.post(
        cartUrl,
        {
          user: '5',
          item: id,
          quantity: quantity,
          price: totPrice,
        },
        {
          headers: {
            // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDM5OWRmNDBmMDhjYjYyNjg5MmQ3ZGQiLCJuYW1lIjoiIiwiaWF0IjoxNjgyODY3Mzg4LCJleHAiOjE2ODU0NTkzODh9.oAAzQNJhV9Oh32BV_hiU1zFoxYlBpa_4W2qJSSotTdw`,
            'Content-Type': 'application/json',
          },
        }
      )
      alert('Product Added to Cart Successfully')
      console.log(resp.data)
    } catch (error) {
      alert('Sorry! Product Add to Cart Failed...')
      console.log(error.response)
    }
  }

  return (
    <div>
      <div class="bg-white border-t border-b py-5">
        <div class="container mx-auto flex justify-center space-x-8 text-sm">
          <div class="flex items-center space-x-4">
            <div class="bg-018083 w-8 h-8 rounded-full flex items-center justify-center">
              <i class="fas fa-comments text-white"></i>
            </div>
            <div>
              <div class="font-semibold">
                NEWEST FASHION TRENDS FOR ALL ALIKE
              </div>
              <span class="text-gray-600">Contact us now online</span>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <div class="bg-018083 w-8 h-8 rounded-full flex items-center justify-center">
              <i class="fas fa-plane text-white"></i>
            </div>
            <div>
              <div class="font-semibold">
                ISLAND WIDE & INTERNATIONAL DELIVERY
              </div>
              <span class="text-gray-600">
                At your doorstep wherever you are, whenever you need
              </span>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <div class="bg-018083 w-8 h-8 rounded-full flex items-center justify-center">
              <i class="fas fa-star text-white"></i>
            </div>
            <div>
              <div class="font-semibold">UNIQUE BRANDED CLOTHING</div>
              <span class="text-gray-600">Incomparably Classy and Unique</span>
            </div>
          </div>
        </div>
      </div>

      {/* <Navbar name="Sunil Perera" /> */}
      <div class="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
        <div class="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
          <img class=" w-full" alt={item_name} src={image} />
          <div className="mt-[40px] w-full max-w-md bg-white rounded-lg shadow-lg p-6 mb-2 mx-auto">
            <ProductReviewList productId={id} />
            <ReviewForm productId={id} buyerId="6442335c26c1890f7a771907" />
          </div>
        </div>
        <div class="md:hidden">
          <img class="w-full" alt={item_name} src={image} />
        </div>
        {/* <div class="md:flex items-center justify-center py-12 2xl:px-20 md:px-6 px-4">
          <img class="w-[600px]" alt={product_name} src={image} />
        </div> */}
        <div class="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
          <div class="border-b  pb-6">
            <h1 class="mt-[20px] lg:text-3xl text-3xl font-semibold lg:leading-6 leading-7 text-gray-800 uppercase  mt-2">
              {item_name}
            </h1>
            <div class="mt-[20px] text-black ">
              <i>"{description}"</i>
            </div>
          </div>
          <ul class="list-disc pl-5">
            <li class="py-4 flex items-center">
              <p class="text-base leading-4 text-gray-800 ">Manufacturer</p>
              <div class="flex items-center ">
                <p class="text-base leading-none text-gray-800 uppercase">
                  : {manufacturer}
                </p>
              </div>
            </li>
            <li class=" flex items-center ">
              <p class="text-base leading-4 text-gray-800 ">Category</p>
              <div class="flex items-center justify-center">
                <p class="text-base leading-none text-gray-800 uppercase">
                  : {category}
                </p>
              </div>
            </li>

            <li class="py-4 flex items-center">
              <p class="text-base leading-4 text-gray-800 "> Product Rating</p>
              <div class="flex items-center ">
                <p class="text-base leading-none text-gray-800 uppercase">
                  : {rating}/5 ({rate_count})
                </p>
              </div>
            </li>
            <li class=" flex items-center ">
              <p class="text-base leading-4 text-gray-800 ">Seller Rating</p>
              <div class="flex items-center justify-center">
                <p class="text-base leading-none text-gray-800 uppercase">
                  : {newSellerRating}/5 ({sRateCount})
                </p>
              </div>
            </li>
          </ul>

          {/* <div class="py-4 border-b border-green-400 flex items-center justify-between">
            <p class="text-base leading-4 text-gray-800 dark:text-gray-300">
              Package Quantity
            </p>
            <div class="flex items-center justify-center">
              <p class="text-base leading-none text-gray-600 dark:text-gray-300">
                {package_quantity}
              </p>
            </div>
          </div> */}
          {/* <div class="py-4 border-b border-green-400 flex items-center justify-between">
            <p class="text-base leading-4 text-gray-800 dark:text-gray-300">
              Shipping Weight
            </p>
            <div class="flex items-center justify-center">
              <p class="text-base leading-none text-gray-600 dark:text-gray-300">
                {shipping_weight}
              </p>
            </div>
          </div> */}
          {/* <div class="py-4 border-b border-green-400 flex items-center justify-between">
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
          </div> */}
          {/* <div class="py-4 border-b border-green-400 flex items-center justify-between">
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
            <p class="text-base leading-4 text-gray-800 dark:text-gray-300">
              Seller Rating
            </p>
            <div class="flex items-center justify-center">
              <p class="text-base leading-none text-gray-600 dark:text-gray-300">
                {newSellerRating}/5 ({sRateCount})
              </p>
            </div>
          </div> */}
          <div class="py-4 border-b  flex items-center jutify-between mt-[10px]">
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  className="rate-product"
                  type="submit"
                  onClick={() => {
                    rateProduct()
                    setLoading(true)
                    window.location.reload(true)
                    setLoading(false)
                  }}
                >
                  Rate Product
                </Button>
              </Grid>
            </Grid>
            <Input
              type="number"
              placeholder="Rate  Product"
              id="newRating"
              name="newRating"
              defaultValue={5}
              disableUnderline={false}
              inputProps={inputProps}
              value={newRating}
              onChange={(e) => setNewRating(e.target.value)}
              className="w-[127px] mr-[20px]"
            ></Input>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  className="rate-seller"
                  onClick={() => {
                    // rateSeller()
                    setLoading(true)
                    window.location.reload(true)
                    setLoading(false)
                  }}
                >
                  Rate Seller
                </Button>
              </Grid>
            </Grid>
            <Input
              type="number"
              placeholder="Rate  Seller"
              id="rate_seller"
              name="rate_seller"
              defaultValue={5}
              disableUnderline={false}
              inputProps={inputProps}
              value={rate_seller}
              onChange={(e) => setRate_seller(e.target.value)}
              className="w-[127px] ml-[20px]"
            ></Input>
          </div>
          <div class="py-4 border-b  flex items-center justify-between mb-[10px]">
            <p class="text-2xl leading-4 text-gray-800 ">
              <b>Price</b>
            </p>
            <div class="flex items-center justify-center">
              <p class="text-2xl leading-none text-gray-800 ">
                <b>LKR {price}.00</b>
              </p>
            </div>
          </div>
          <Grid container spacing={4}>
            <div class="mt-[30px] flex items-center justify-between">
              <div class="ml-[32px] mr-[135px]">
                <Grid item xs={12}>
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    onClick={() => {
                      handleQuantity('increase')
                    }}
                  >
                    +
                  </Button>
                </Grid>
              </div>
              <div class="w-[187px]">
                <Grid item xs={12}>
                  <Typography className="quantity" variant="h6">
                    Quantity: {quantity}
                  </Typography>
                </Grid>
              </div>
              <div class="ml-[135px]">
                <Grid item xs={12}>
                  <Button
                    size="small"
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                      handleQuantity('decrease')
                    }}
                  >
                    -
                  </Button>
                </Grid>
              </div>
            </div>

            <Grid item xs={12}>
              <div class="mt-[30px] flex items-center justify-center">
                <Button
                  size="large"
                  variant="contained"
                  style={{ backgroundColor: '#018083', color: 'white' }}
                  onClick={addToCart}
                >
                  <FaShoppingCart class="mr-[10px]" /> Add to cart
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      <div class="md:hidden">
        <div className="mt-[40px] w-full max-w-md bg-white rounded-lg shadow-lg p-6 mb-2 mx-auto">
          <ProductReviewList productId={id} />
          <ReviewForm productId={id} buyerId="6442335c26c1890f7a771907" />
        </div>
      </div>
    </div>
  )
}
export default SingleProduct
