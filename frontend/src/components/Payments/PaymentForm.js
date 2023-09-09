import React, { useState, useContext } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'
import CartContext from '../order/CartContext'

import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

//toastify alert messages
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
}

const PaymentForm = () => {
  const notify2 = () => toast('Payment Successful.')
  const notify3 = () => toast('Payment Unsuccessful.')

  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const stripe = useStripe()
  const elements = useElements()
  const { TotalFinal, setpaymentsucces } = useContext(CartContext)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) return

    const cardElement = elements.getElement(CardElement)

    const { error, token } = await stripe.createToken(cardElement)
    console.log(typeof TotalFinal)

    if (error) {
      setError(error.message)
    } else {
      const response = await axios.post('http://localhost:3007/api/payment', {
        amount: TotalFinal * 100, // Set the amount you want to charge in cents
        token: token,
      })

      if (response.data.success) {
        setSuccess('Payment successful!')
        setpaymentsucces(1)
        setError(null)
        notify2()
        window.alert('Payment successful!')
      } else {
        setError('Payment failed. Please try again.')
        setpaymentsucces(0)
        setSuccess(null)
        notify3()
        window.alert('Payment failed. Please try again.')
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <CardElement options={CARD_ELEMENT_OPTIONS} className="p-2 border" />
      </div>
      <button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
        disabled={!stripe}
      >
        Pay
      </button>
      {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
      {success && (
        <div className="text-green-500 mt-4 text-center">{success}</div>
      )}
    </form>
  )
}

export default PaymentForm
