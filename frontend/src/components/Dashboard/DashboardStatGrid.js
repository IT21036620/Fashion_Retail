import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'
import { Pie } from 'react-chartjs-2'
import PieChartComponent from './PieChartComponent'

export default function DashboardStatGrid() {
  const [customers, SetCustomers] = useState([])
  const [orders, SetOrders] = useState([])
  const [items, SetItems] = useState([])
  const [categoryReach, SetCategoryReach] = useState([])

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

  const data = {
    categoryReachObject: [
      {
        reach_count: 16,
        _id: '6526460c1a03f23958e96453',
        category: 'Sports',
        createdAt: '2023-10-11T06:51:56.901Z',
        updatedAt: '2023-10-11T19:13:13.767Z',
        __v: 0,
      },
      {
        reach_count: 7,
        _id: '652645f11a03f23958e96451',
        category: 'Tshirts',
        createdAt: '2023-10-11T06:51:29.114Z',
        updatedAt: '2023-10-11T19:13:15.080Z',
        __v: 0,
      },
      // ... [other objects in the array, similar format as above]
      {
        reach_count: 5,
        _id: '6526466d1a03f23958e96461',
        category: 'Socks',
        createdAt: '2023-10-11T06:53:33.575Z',
        updatedAt: '2023-10-11T06:53:33.575Z',
        __v: 0,
      },
    ],
  }

  // useEffect(() => {
  //   function getCategoryReach() {
  //     axios
  //       .get('http://localhost:4000/api/v1/category-reach')
  //       .then((res) => {
  //         SetCategoryReach(res.data)
  //       })
  //       .catch((err) => {
  //         alert(err.message)
  //       })
  //   }

  //   getCategoryReach()
  // }, [])

  const getCategoryReach = () => {
    axios
      .get(`http://localhost:4000/api/v1/category-reach`)
      .then((res) => {
        console.log(res.data)
        SetCategoryReach(res.data)
      })
      .catch((err) => {
        alert(err.message)
      })
  }

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

  return (
    <div onLoad={getCategoryReach}>
      <div className="flex flex-col gap-4 w-full items-start">
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
      </div>

      {/* pie chart */}
      <div className="w-100 mt-4">
        <PieChartComponent data={data} />
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
