import React from 'react'
import OrderSummary from './orderSummary.js'
import ShoppingCart from './shoppingCart'
import CartContext from './CartContext'
import ShippingDetails from './ShippingDetails'
import PaymentHome from '../Payments/PaymentHome'

export default function CartPage() {
  const [cartTotal, setCartTotal] = React.useState(0)
  const [TotalFinal, setTotalFinal] = React.useState(0)
  const [paymentsucces, setpaymentsucces] = React.useState(0)

  return (
    <CartContext.Provider
      value={{
        cartTotal,
        setCartTotal,
        TotalFinal,
        setTotalFinal,
        paymentsucces,
        setpaymentsucces,
      }}
    >
      <div class="bg-gray-100 ">
        <div class="bg-white border-t border-b py-5 mb-4">
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
                <span class="text-gray-600">
                  Incomparably Classy and Unique
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="flex">
          <div class=" w-3/4 max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-6">
            <ShoppingCart />

            <details className="bg-gray-100 shadow rounded group p-1 mt-5 ">
              <summary className="text-sm font-medium leading-6 text-gray-900 list-none flex flex-wrap items-center cursor-pointer">
                <span className="flex-1">Shipping Details</span>
                <div className="border-8 border-transparent ml-2 border-l-gray-600 group-open:rotate-90 transition-transform origin-left"></div>
              </summary>
              <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0 w-full">
                <ShippingDetails />
              </div>
            </details>

            <details className="bg-slate-100 shadow rounded group p-1 mt-5">
              <summary className="text-sm font-medium leading-6 text-gray-900  list-none flex flex-wrap items-center cursor-pointer">
                <span className="flex-1">Payment Details</span>
                <div className="border-8 border-transparent ml-2 border-l-gray-600 group-open:rotate-90 transition-transform origin-left"></div>
              </summary>
              <div className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 sm:mt-0 w-full">
                <PaymentHome />
              </div>
            </details>
          </div>

          <div class=" w-1/4 ">
            {/* <div class="max-w-ml mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
              <div class=" p-4">
                <h2 class="font-bold text-xl mb-4 pb-2 pt-2">Promo code</h2>
                <div class="flex justify-between mb-2 pb-2">
                  <input
                    type="text"
                    class="border-2 border-gray-400 bg-white rounded-lg px-4 py-2 text-xl"
                  ></input>
                  <button class="bg-transparent hover:bg-green-200 text-black-800  py-2 px-4 border border-gray-400 rounded shadow">
                    Apply
                  </button>
                </div>
              </div>
            </div> */}

            <div class="pt-5">
              <div class="max-w-ml mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-4 mb-6">
                <OrderSummary />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CartContext.Provider>
  )
}
