import React, { useState, useEffect } from 'react'
import axios from 'axios'
import useAuth from '../../hooks/useAuth'
import * as XLSX from 'xlsx'

export default function OrdersAdmin() {
  const [items, SetItems] = useState([])
  const { auth } = useAuth()

  useEffect(() => {
    function getItems() {
      axios
        .get('http://localhost:4000/api/v1/items')
        .then((res) => {
          SetItems(res.data.items)
        })
        .catch((err) => {
          alert(err.message)
        })
    }

    getItems()
  }, [])

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(items)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Items')
    XLSX.writeFile(wb, 'items.xlsx')
  }

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <div className="flex justify-between items-center">
        <strong className="text-gray-700 font-medium">All Items</strong>
        <a
          href="/seller/add-product"
          className="bg-blue-500 text-white px-4 py-2 rounded  inline-block  hover:no-underline"
        >
          Add New Item
        </a>

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
              <th>Item Name</th>
              <th>Image</th>
              <th>Category</th>
              <th>Clothing Type</th>
              <th>Item Manufacturer</th>
              <th>Description</th>
              <th>Price</th>
              <th>Sizes</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.item_name}</td>
                <td>
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-20 w-20">
                      <img
                        class="h-20 w-20 "
                        crossOrigin="anonymous"
                        src={item.image}
                        alt=""
                      ></img>
                    </div>
                  </div>
                </td>
                <td>{item.category}</td>
                <td>{item.clothing_type}</td>
                <td>{item.manufacturer}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>{item.size}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
