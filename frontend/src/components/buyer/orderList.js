import React, { useEffect, useState } from 'react'
import axios from 'axios'

const OrderList = ({ buyerId }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `http://localhost:3006/api/v1/orders/customers/${buyerId}`
        )
        setOrders(response.data.orders)
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }

    fetchOrders()
  }, [])

  //   useEffect(() => {
  //     const fetchOrders = async () => {
  //       try {
  //         const response = await axios.get(
  //           `http://localhost:3005/api/v1/orders/customers/6442335c26c1890f7a771907`
  //         )
  //         console.log('Response data: ', response.data)
  //         console.log('Current orders (before): ', orders)
  //         setOrders(response.data)
  //         console.log('Current orders (after): ', orders)
  //         // console.log(orders)
  //         // console.log(buyerId)
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     }

  //     fetchOrders()
  //   }, [buyerId])

  useEffect(() => {
    console.log(orders)
  }, [orders])

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-red-200 text-red-800'
      case 'confirmed':
        return 'bg-green-200 text-green-800'
      case 'dispatched':
        return 'bg-yellow-200 text-yellow-800'
      case 'delivered':
        return 'bg-blue-200 text-blue-800'
      default:
        return 'bg-gray-200 text-gray-800'
    }
  }

  return (
    <div className="bg-gray-50 p-4 rounded-lg ml-36">
      <h2 className="text-3xl text-blue-400 font-bold mb-4">Orders</h2>
      {orders.length > 0 ? (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="text-sm font-semibold text-gray-700 p-2">
                Order ID
              </th>
              <th className="text-sm font-semibold text-gray-700 p-2">
                Total Price
              </th>
              <th className="text-sm font-semibold text-gray-700 p-2">Date</th>
              <th className="text-sm font-semibold text-gray-700 p-2">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-100">
                <td className="p-2 border-t border-gray-300">{order._id}</td>
                <td className="p-2 border-t border-gray-300">
                  Rs.{order.totalPrice}
                </td>
                <td className="p-2 border-t border-gray-300">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td
                  className={`p-2 border-t border-gray-300 ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No orders yet.</p>
      )}
    </div>

    // <div className="bg-gray-50 p-4 rounded-lg">
    //   <h2 className="text-xl font-bold mb-4">Orders</h2>
    //   {orders.length > 0 ? (
    //     <table className="w-full text-left border-collapse">
    //       <thead>
    //         <tr>
    //           <th className="text-sm font-semibold text-gray-700 p-2">
    //             Order ID
    //           </th>
    //           <th className="text-sm font-semibold text-gray-700 p-2">
    //             Total Price
    //           </th>
    //           <th className="text-sm font-semibold text-gray-700 p-2">Date</th>
    //           <th className="text-sm font-semibold text-gray-700 p-2">
    //             Status
    //           </th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {orders.map((order) => (
    //           <tr key={order.order_id} className="hover:bg-gray-100">
    //             <td className="p-2 border-t border-gray-300">{order._id}</td>
    //             <td className="p-2 border-t border-gray-300">
    //               ${order.totalPrice}
    //             </td>
    //             <td className="p-2 border-t border-gray-300">
    //               {new Date(order.createdAt).toLocaleDateString()}
    //             </td>
    //             <td
    //               className={`p-2 border-t border-gray-300 ${getStatusColor(
    //                 order.status
    //               )}`}
    //             >
    //               {order.status}
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   ) : (
    //     <p className="text-gray-600">No orders yet.</p>
    //   )}
    // </div>
  )
}

export default OrderList
