import React from 'react'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import CartContext from './CartContext'

export default function ShoppingCart() {
  const [carts, SetCarts] = useState([])
  const [itemRemoved, setItemRemoved] = useState(false)
  const [isDataFetched, setIsDataFetched] = useState(false)
  const { cartTotal, setCartTotal } = useContext(CartContext)

  useEffect(() => {
    setCartTotal(calculateTotal())
  }, [carts])

  const handleQuantityChangeForCart = (cartId, newQuantity) => {
    SetCarts((prevCarts) =>
      prevCarts.map((cart) =>
        cart._id === cartId
          ? {
              ...cart,
              quantity: newQuantity,
              totalPrice: newQuantity * cart.product.price,
            }
          : cart
      )
    )
  }

  const handleRemoveItem = (itemId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to remove this item?'
    )
    if (confirmDelete) {
      axios
        .delete(`http://localhost:3003/api/v1/cart/${itemId}`)
        .then((res) => {
          console.log(res.data.message)
          SetCarts((prevCarts) =>
            prevCarts.filter((cart) => cart._id !== itemId)
          )
          setItemRemoved((prev) => !prev)
          setIsDataFetched(false)
        })
        .catch((err) => {
          alert(err.message)
        })
    }
  }

  const handleDeleteAll = () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to remove all items?'
    )
    if (confirmDelete) {
      axios
        .delete('http://localhost:3003/api/v1/cart')
        .then((res) => {
          console.log(res.data.message)
          setIsDataFetched(false)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  useEffect(() => {
    function getCarts() {
      axios
        .get('http://localhost:3003/api/v1/cart')
        .then((res) => {
          console.log(res.data.carts)
          SetCarts(
            res.data.items.map((item) => ({
              ...item,
              totalPrice: item.product.price,
            }))
          )
          setIsDataFetched(true)
        })
        .catch((err) => {
          alert(err.message)
        })
    }

    if (!isDataFetched || itemRemoved) {
      getCarts()
    }
  }, [itemRemoved, isDataFetched])

  const calculateTotal = () => {
    return carts.reduce((total, cart) => total + cart.totalPrice, 0)
  }

  return (
    <div>
      <div>
        <tr>
          <div class="px-4 py-2">
            <h2 class="text-gray-800 text-2xl font-bold">Shopping Cart</h2>
            <button
              class=" bg-red text-[14px] hover:text-red-500 bold"
              onClick={handleDeleteAll}
            >
              Remove all items
            </button>
          </div>
        </tr>
      </div>

      {/* Cat headings */}
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total
                    </th>
                  </tr>
                </thead>
                {/* Cart Containt  */}
                <tbody class="bg-white divide-y divide-gray-200">
                  {carts.map((cart) => (
                    <tr>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="flex-shrink-0 h-20 w-20">
                            <img
                              class="h-20 w-20 "
                              crossOrigin="anonymous"
                              src={cart.product.image}
                              alt=""
                            ></img>
                          </div>

                          <div class="ml-4">
                            <div class="text-[6] font-medium text-gray-900">
                              {cart.product.product_name}
                            </div>
                            <div class="text-[12px]">
                              Manufacturer: {cart.product.manufacturer}
                              <br></br>Weight:{cart.product.shipping_weight}
                            </div>
                            {/* Reomve btn for cart item remove */}
                            <button
                              class="pt-5 bg-red text-[14px] hover:text-red-500 bold"
                              onClick={() => handleRemoveItem(cart._id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="text-gray-900 font-medium">
                          Rs.{cart.product.price.toFixed(2)}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="inline-block relative">
                          <select
                            // onChange={handleQuantityChange}
                            defaultValue={cart.quantity}
                            onChange={(event) =>
                              handleQuantityChangeForCart(
                                cart._id,
                                parseInt(event.target.value)
                              )
                            }
                            class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                          >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                          </select>
                          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                              class="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M14.95 7.95a1 1 0 01-1.41 0L10 4.91l-3.54 3.54a1 1 0 01-1.41-1.41l4-4a1 1 0 011.41 0l4 4a1 1 0 010 1.41z" />
                            </svg>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="text-gray-900 font-medium">
                          Rs.{cart.totalPrice.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
