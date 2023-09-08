import React from 'react'
import { Outlet, Route, Link, BrowserRouter, Routes } from 'react-router-dom'
import {
  FaTachometerAlt,
  FaShoppingCart,
  FaComment,
  FaUser,
} from 'react-icons/fa'
import { RxDashboard } from 'react-icons/rx'

const Dashboard = () => <div>Dashboard Content</div>
const Orders = () => <div>Orders Content</div>
const Reviews = () => <div>Reviews Content</div>
const AccountInfo = () => <div>Account Information Content</div>

const Sidebar = ({ onNavigate }) => {
  return (
    <div className="flex">
      <div className="bg-white w-64 h-screen border">
        <ul className="divide-y divide-gray-200">
          <li>
            {/* <Link
              to="/dashboard"
              className="block p-4 w-full hover:bg-gray-100 text-gray-600 font-medium flex items-center"
            >
              <FaHome className="mr-2" />
              Dashboard
            </Link> */}
            <button
              onClick={() => onNavigate('dashboard')}
              className="block p-4 w-full hover:bg-gray-100 text-gray-600 font-medium flex items-center"
            >
              <RxDashboard className="mr-2" />
              Overview
            </button>
          </li>
          <li>
            {/* <Link
              to="/account-info"
              className="block p-4 w-full hover:bg-gray-100 text-gray-600 font-medium flex items-center"
            >
              <FaCog className="mr-2" />
              Account Information
            </Link> */}
            <button
              onClick={() => onNavigate('account-info')}
              className="block p-4 w-full hover:bg-gray-100 text-gray-600 font-medium flex items-center"
            >
              <FaUser className="mr-2" />
              My Profile
            </button>
          </li>
          <li>
            {/* <Link
              to="/orders"
              className="block p-4 w-full hover:bg-gray-100 text-gray-600 font-medium flex items-center"
            >
              <FaShoppingCart className="mr-2" />
              Orders
            </Link> */}
            <button
              onClick={() => onNavigate('orders')}
              className="block p-4 w-full hover:bg-gray-100 text-gray-600 font-medium flex items-center"
            >
              <FaShoppingCart className="mr-2" />
              My Orders
            </button>
          </li>
          <li>
            {/* <Link
              to="/reviews"
              className="block p-4 w-full hover:bg-gray-100 text-gray-600 font-medium flex items-center"
            >
              <FaComment className="mr-2" />
              Reviews
            </Link> */}
            <button
              onClick={() => onNavigate('reviews')}
              className="block p-4 w-full hover:bg-gray-100 text-gray-600 font-medium flex items-center"
            >
              <FaComment className="mr-2" />
              Reviews
            </button>
          </li>
        </ul>
      </div>
      <div className="flex-1"></div>
    </div>
  )
}

export default Sidebar
