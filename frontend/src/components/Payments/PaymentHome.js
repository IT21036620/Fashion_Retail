import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import PaymentForm from './PaymentForm'

const stripePromise = loadStripe(
  'pk_test_51MxQmUK1beqnoX8FavXSpHU1OTlGBbh9K1N0hkDStMFJbODqPOFWbkRxRfo8gDzkij2MZnHgIx0O8vXzfbWo5z7v00qTmUVTWN'
)

function PaymentHome() {
  return (
    <div className="App  bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-base font-bold mb-6 text-center">
          Stripe Payment Gateway
        </h1>
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      </div>
    </div>
  )
}

export default PaymentHome
