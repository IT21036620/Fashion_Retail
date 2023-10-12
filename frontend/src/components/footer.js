import React from 'react'
import { MdShoppingCart, MdAccountCircle } from 'react-icons/md'
import { FaLeaf } from 'react-icons/fa'

const footer = ({ name }) => {
  return (
    <div>
      <section className="bg-[#fcf5f5] text-black py-6 h-[400px]">
        <div className="container mx-auto flex flex-col items-center justify-center h-full">
          <h2 className="text-4xl font-bold mb-4">
            Subscribe to our Newsletter
          </h2>
          <p className="mb-6 text-xl">
            Stay updated with our latest fashion trends and offers.
          </p>

          <form className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email address"
              className="p-2 rounded-l-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              type="submit"
              className="bg-[#018083] hover:bg-blue-600 text-white p-2 rounded-r-md"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

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
    </div>
  )
}

export default footer
