import React from 'react'
import { MdShoppingCart, MdAccountCircle, MdSearch } from 'react-icons/md'
import { FaLeaf } from 'react-icons/fa'

const Navbar = ({ name }) => {
  return (
    <nav className="bg text-black py-2 px-4 bg-[#fcf5f5]">
      <div className="container mx-auto flex justify-between items-center">
        {/* Search input with icon */}
        <div className="relative w-[300px] mr-2">
          <input
            type="text"
            placeholder="Search"
            className="p-2 rounded bg-white text-green-700 w-full pr-10 hover:no-underline"
          />
          <MdSearch
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-700"
            size="20px"
          />
        </div>

        {/* Logo */}
        <a
          href="/"
          className="text-black font-bold text-2xl flex mr-10 hover:no-underline"
        >
          <FaLeaf className="mr-2" />
          FASHIONstore
        </a>

        <div className="flex space-x-5 px-2">
          <div className="relative group inline-block">
            <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded-lg shadow-md hidden group-hover:block">
              <a href="#" className="block px-4 py-2 hover:no-underline">
                Men
              </a>
              <a href="#" className="block px-4 py-2 hover:no-underline">
                Women
              </a>
              <a href="#" className="block px-4 py-2 hover:no-underline">
                Unisex
              </a>
            </div>
          </div>

          <a href="/About" className="text-black hover:no-underline">
            About Us
          </a>

          <a href="/products" className="text-black hover:no-underline">
            Products
          </a>

          <a
            href="/cart"
            className="text-black flex items-center text-l hover:no-underline"
          >
            <MdShoppingCart size="30px" className="ml-1" />
          </a>

          <a
            href="/buyer/account"
            className="text-black flex items-center border-2 border-white rounded-lg  ml-10 hover:no-underline"
          >
            <span>{name}</span>
            <MdAccountCircle size="25px" className="mr-1 ml-1" />
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
