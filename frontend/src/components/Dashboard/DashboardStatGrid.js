import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'
import { Pie } from 'react-chartjs-2'
import PieChartComponent from './PieChartComponent'
import * as XLSX from 'xlsx'

export default function DashboardStatGrid() {
  const [customers, SetCustomers] = useState([])
  const [orders, SetOrders] = useState([])
  const [items, SetItems] = useState([])
  const [categoryReach, SetCategoryReach] = useState([])
  const [itemReachs, SetItemReach] = useState([])
  const [revenues, SetRevenue] = useState([])

  const [data, setData] = useState({
    categoryReachObject: [],
  })

  useEffect(() => {
    function getCustomers() {
      axios
        .get('http://localhost:4000/api/v1/customer')
        .then((res) => {
          SetCustomers(res.data)
        })
        .catch((err) => {
          alert(err.message)
        })
    }

    getCustomers()
  }, [])

  useEffect(() => {
    function getItemReach() {
      axios
        .get('http://localhost:4000/api/v1/item-reach')
        .then((res) => {
          SetItemReach(res.data.recommendations)
        })
        .catch((err) => {
          alert(err.message)
        })
    }
    getItemReach()
  }, [])

  useEffect(() => {
    function getCategoryReach() {
      axios
        .get('http://localhost:4000/api/v1/category-reach')
        .then((res) => {
          setData(res.data)
        })
        .catch((err) => {
          alert(err.message)
        })
    }

    getCategoryReach()
  }, [])

  useEffect(() => {
    function getOrders() {
      axios
        .get('http://localhost:4000/api/v1/order')
        .then((res) => {
          SetOrders(res.data)
        })
        .catch((err) => {
          alert(err.message)
        })
    }

    getOrders()
  }, [])

  useEffect(() => {
    function getItems() {
      axios
        .get('http://localhost:4000/api/v1/items')
        .then((res) => {
          SetItems(res.data)
        })
        .catch((err) => {
          alert(err.message)
        })
    }

    getItems()
  }, [])

  useEffect(() => {
    function getRevenue() {
      axios
        .get('http://localhost:4000/api/v1/totalSales')
        .then((res) => {
          SetRevenue(res.data)
        })
        .catch((err) => {
          alert(err.message)
        })
    }

    getRevenue()
  }, [])

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(itemReachs)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Item Reached')
    XLSX.writeFile(wb, 'ItemReached.xlsx')
  }

  return (
    <div>
      <div className="flex gap-4 w-full">
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
            <IoBagHandle className="text-2xl text-white" />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">
              Total Items
            </span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">
                {items.nbHits}
              </strong>
            </div>
          </div>
        </BoxWrapper>
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
            <IoPieChart className="text-2xl text-white" />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">
              Total Expenses
            </span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">
                $3423
              </strong>
              <span className="text-sm text-green-500 pl-2">-343</span>
            </div>
          </div>
        </BoxWrapper>
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
            <IoPeople className="text-2xl text-white" />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">
              Total Customers
            </span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">
                {customers.count}
              </strong>
            </div>
          </div>
        </BoxWrapper>
        <BoxWrapper>
          <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
            <IoCart className="text-2xl text-white" />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">
              Total Orders
            </span>
            <div className="flex items-center">
              <strong className="text-xl text-gray-700 font-semibold">
                {orders.count}
              </strong>
            </div>
          </div>
        </BoxWrapper>
      </div>

      <div className="flex mt-4 gap-4">
        {/* Pie Chart */}
        <div className="flex-1 flex justify-center items-center h-[400px] w-[500px]">
          <PieChartComponent data={data} />
        </div>

        {/* Table */}
        <div className="flex-1 bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200">
          <div className="flex justify-between items-center">
            <strong className="text-gray-700 font-medium">
              Top Reached Items
            </strong>
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
                  <th>Rank</th>
                  <th>Item Name</th>
                  <th>Image</th>
                  <th>Category</th>
                  <th>Reach Count</th>
                </tr>
              </thead>
              <tbody>
                {itemReachs.map((itemReach, index) => (
                  <tr key={itemReach._id}>
                    <td>{index + 1}</td>
                    <td>{itemReach.item.item_name}</td>
                    <td>
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-20 w-20">
                          <img
                            className="h-20 w-20 "
                            crossOrigin="anonymous"
                            src={itemReach.item.image}
                            alt=""
                          />
                        </div>
                      </div>
                    </td>
                    <td>{itemReach.item.category}</td>
                    <td>{itemReach.reach_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  )
}
