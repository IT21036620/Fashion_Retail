import React, { useContext, useState, useEffect } from 'react'
import CartContext from './CartContext'
import axios from 'axios'

import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

//toastify alert messages
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function OrderSummary() {
  const notify = () => toast('Checkout Completed.')

  const { cartTotal } = useContext(CartContext)
  const [commission, setCommission] = useState(0)
  const { TotalFinal, setTotalFinal, paymentsucces } = useContext(CartContext)

  const fetchCommission = async (totalPrice) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/v1/cart/commission',
        {
          totalPrice,
        }
      )
      setCommission(response.data.commission)
    } catch (error) {
      console.error(error)
    }
  }

  // useEffect(() => {
  //   fetchCommission(cartTotal)
  // }, [cartTotal])

  useEffect(() => {
    fetchCommission(cartTotal)
    setTotalFinal(cartTotal + 540 + commission)
  }, [cartTotal])

  const handleCheckout = () => {
    paymentsucces ? alertok() : alert('Please Pay the Amout to continue....')
  }

  const alertok = async () => {
    const data = { customer: '652630967c05565ff4d7687e' }

    const response = await axios.post(
      'http://localhost:4000/api/v1/cart/cartcomplete',
      data
    )

    const custid = response
    const data2 = {
      customer: '652630967c05565ff4d7687e',

      cartComplete: '65269a5e64700d30b4fb15bf',
    }

    // const response2 = await axios.post(
    //   'http://localhost:4000/api/v1/order',
    //   data2
    // )

    // if (response2.data) {
    //   window.alert('Checkout successful!')
    //   window.location.href = '/'
    // }

    if (response.data) {
      window.alert('Checkout successful!')
      window.location.href = '/'
    }
  }

  return (
    <div class=" p-4">
      <h2 class="font-bold text-lg mb-4 pb-2 pt-2">Order Summary</h2>
      <div class="flex justify-between mb-2">
        <span>Items Total</span>
        <span>Rs.{cartTotal}.00</span>
      </div>
      <div class="flex justify-between mb-2 pb-2">
        <span class="font-medium">Site Commission</span>
        <span class="text-green-500">Rs.{commission}.00</span>
      </div>

      <hr class="border border-b border-gray-200 "></hr>

      <div class="flex justify-between mb-2 pt-2">
        <span class="font-bold">Subtotal</span>
        <span>Rs.{cartTotal + cartTotal * 0.05}.00</span>
      </div>
      <div class="flex justify-between mb-2 pb-2">
        <span>
          Shipping <br></br>
          <span class="text-[12px] border-gray-50">
            Duties & Taxes may be collected at delivery.
          </span>
        </span>
        <span>Rs.540.00</span>
      </div>

      <hr class="border border-b border-gray-200 "></hr>

      <div class="flex justify-between font-bold pt-2">
        <span>Total:</span>
        <span>Rs.{TotalFinal}.00</span>
      </div>
      <button
        onClick={handleCheckout}
        class="bg-[#018083] text-white px-4 py-2 mt-4 rounded hover:bg-[#018083] h-11 w-80"
      >
        Checkout
      </button>
    </div>
  )
}
