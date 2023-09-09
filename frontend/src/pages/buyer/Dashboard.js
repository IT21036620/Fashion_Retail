import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState('')

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await axios.get(
        'http://localhost:3002/api/buyer/getBuyer/6442335c26c1890f7a771907'
      )
      setUserInfo(response.data.data)
    }

    fetchUserInfo()
  }, [])

  return (
    // <div className="p-4">
    //   <h2 className="text-2xl font-semibold">Dashboard</h2>
    //   {userInfo ? (
    //     <>
    //       <p className="mt-4">Name: {userInfo.buyerName}</p>
    //       <p>Address: {userInfo.address}</p>
    //       <p>Email: {userInfo.email}</p>
    //       <p>Phone: {userInfo.phone}</p>
    //     </>
    //   ) : (
    //     <p>Loading...</p>
    //   )}
    // </div>
    <div className="container flex ml-20">
      <div className="container bg-gray-200 rounded-xl shadow border p-8 m-10 w-11/12">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Account Details
        </h2>
        <div className="container bg-white rounded-xl shadow border p-8 m-10 w-10/12">
          <h4 className="text-3xl font-semibold text-blue-500 capitalize p-3">
            {userInfo.buyerName}
          </h4>
          <p className="p-2">
            <strong>Address : </strong>
            {userInfo.address}
          </p>
          <p className="p-2">
            <strong>Email : </strong>
            {userInfo.email}
          </p>
          <p className="p-2">
            <strong>phone : </strong>
            {userInfo.phone}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
