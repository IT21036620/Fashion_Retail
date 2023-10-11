import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { getOrderStatus } from './libs/helpers/statusSelector'
import axios from 'axios'
import useAuth from '../../hooks/useAuth'

export default function AllCustomers() {
  const [items, SetItems] = useState([])
  const { auth } = useAuth()

  useEffect(() => {
    function getItems() {
      axios
        .get('http://localhost:4000/api/v1/customer')
        .then((res) => {
          console.log(res.data.items)
          SetItems(res.data.items)
        })
        .catch((err) => {
          alert(err.message)
        })
    }

    getItems()
  }, [items])

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">All Customers</strong>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Contact Number</th>
              <th>Address</th>
              <th>Registered Date</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.item_name}</td>
                <td>{item.category}</td>
                <td>{item.clothing_type}</td>
                <td>{item.manufacturer}</td>
                <td>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
