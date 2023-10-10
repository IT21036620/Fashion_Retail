import React from 'react'
import { MdShoppingCart, MdAccountCircle } from 'react-icons/md'
import { FaLeaf } from 'react-icons/fa'

const footer = ({ name }) => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <h1 className="text-xl font-bold mb-2">FASHIONstore</h1>

        <p className="mb-3">
          © {new Date().getFullYear()} FASHIONstore. All rights reserved.
        </p>

        <div className="flex justify-center space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">
            Terms & Conditions
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            Contact
          </a>
        </div>

        <div className="mt-5">
          <p>Follow us on:</p>
          <div className="flex justify-center space-x-5 mt-2">
            {/* You can add social media icons here using react-icons or simple images */}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default footer
