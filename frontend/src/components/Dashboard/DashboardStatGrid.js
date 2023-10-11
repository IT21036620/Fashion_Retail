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

  // useEffect(() => {
  //   // Function to fetch data from the API
  //   const axios = async () => {
  //     try {
  //       const response = await fetch(
  //         'http://localhost:4000/api/v1/category-reach'
  //       )
  //       const result = await response.json().categoryReachObject

  //       if (result && Array.isArray(result)) {
  //         setData({ result })
  //         console.log(data)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error)
  //     }
  //   }

  //   // Call the fetch function
  //   fetchData()
  // }, [])

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

  // const getCategoryReach = () => {
  //   axios
  //     .get(`http://localhost:4000/api/v1/category-reach`)
  //     .then((res) => {
  //       console.log(res.data)
  //       SetCategoryReach(res.data)
  //     })
  //     .catch((err) => {
  //       alert(err.message)
  //     })
  // }

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

      <div>
        {/* pie chart */}
        <div className="flex justify-center items-center h-screen">
          <PieChartComponent data={data} />
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
