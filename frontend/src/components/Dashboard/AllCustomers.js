import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { getOrderStatus } from './libs/helpers/statusSelector'
import axios from 'axios'
import useAuth from '../../hooks/useAuth'
import * as XLSX from 'xlsx'

export default function AllCustomers() {
  const [customers, SetCustomers] = useState([])
  const { auth } = useAuth()

  useEffect(() => {
    function getCustomers() {
      axios
        .get('http://localhost:4000/api/v1/customer')
        .then((res) => {
          console.log(res.data.customers)
          SetCustomers(res.data.customers)
        })
        .catch((err) => {
          alert(err.message)
        })
    }

    getCustomers()
  }, [customers])

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(customers)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Customers')
    XLSX.writeFile(wb, 'customers.xlsx')
  }

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <div className="flex justify-between items-center">
        <strong className="text-gray-700 font-medium">All Customers</strong>

        <button
          onClick={exportToExcel}
          className="bg-blue-500 text-white px-4 py-2 rounded "
        >
          Export
        </button>
      </div>

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
            {customers.map((customer) => (
              <tr key={customer._id}>
                <td>{customer._id}</td>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td>{customer.contactNumber}</td>
                <td>{customer.address}</td>
                <td>{customer.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
