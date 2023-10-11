import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import axios from 'axios'

const AccountInfo = () => {
  const [userInfo, setUserInfo] = useState(null)
  const [buyerInfo, setBuyerInfo] = useState({
    buyerName: '',
    address: '',
    email: '',
    phone: '',
  })

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3002/api/buyer/getBuyer/6442335c26c1890f7a771907'
        )
        setUserInfo(response.data.data)
        setBuyerInfo({
          buyerName: response.data.data.buyerName,
          address: response.data.data.address,
          email: response.data.data.email,
          phone: response.data.data.phone,
        })
      } catch (error) {
        console.log(error)
      }
    }

    fetchUserInfo()
  }, [])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setBuyerInfo((prevInfo) => ({ ...prevInfo, [name]: value }))
  }

  const handleUpdateInfo = async () => {
    console.log(buyerInfo)
    try {
      const response = await axios.patch(
        `http://localhost:3002/api/buyer/updateBuyer/6442335c26c1890f7a771907`,
        buyerInfo
      )
      setUserInfo(response.data.data)
      console.log('Update successful!')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg ml-36">
      <h2 className="text-3xl font-bold mb-4 inline-flex items-center text-blue-400">
        <FaUser className="mr-2" />
        Account Information
      </h2>

      {userInfo ? (
        <>
          <label className="block mb-2 ">
            <label className="font-bold">Name:</label>
            <input
              type="text"
              name="buyerName"
              defaultValue={userInfo.buyerName}
              onChange={handleInputChange}
              className="block w-full bg-white border-gray-300 rounded-md shadow-sm mt-1 p-2"
            />
          </label>
          <label className="block mb-2">
            <label className="font-bold">Address:</label>
            <input
              type="text"
              name="address"
              defaultValue={userInfo.address}
              onChange={handleInputChange}
              className="block w-full bg-white border-gray-300 rounded-md shadow-sm mt-1 p-2"
            />
          </label>
          <label className="block mb-2">
            <label className="font-bold">Email:</label>
            <input
              type="email"
              name="email"
              defaultValue={userInfo.email}
              onChange={handleInputChange}
              className="block w-full bg-white border-gray-300 rounded-md shadow-sm mt-1 p-2"
            />
          </label>
          <label className="block mb-2">
            <label className="font-bold">Phone:</label>
            <input
              type="tel"
              name="phone"
              defaultValue={userInfo.phone}
              onChange={handleInputChange}
              className="block w-full bg-white border-gray-300 rounded-md shadow-sm mt-1 p-2"
            />
          </label>
          <div className="flex justify-center">
            <button
              onClick={handleUpdateInfo}
              className="bg-green-400 text-gray-600 py-2 px-4 rounded hover:bg-green-600"
            >
              Update Information
            </button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default AccountInfo
