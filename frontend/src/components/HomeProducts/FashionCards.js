import React from 'react'
import img3 from './imges/01.jpg'

const FashionCards = () => {
  return (
    <div className="flex justify-between">
      <div
        className="w-1/3 p-4 cursor-pointer transform transition hover:scale-105"
        // onClick={onClick}
      >
        <div
          style={{
            backgroundImage: { img3 },
          }}
          className="bg-cover bg-center h-64 rounded-lg flex flex-col justify-end p-4"
        >
          <h3 className="text-2xl font-bold text-white mb-2">Men</h3>
          <button className="bg-white text-black p-2 rounded-md">
            Explore
          </button>
        </div>
      </div>

      <div
        className="w-1/3 p-4 cursor-pointer transform transition hover:scale-105"
        // onClick={onClick}
      >
        <div
          style={{ backgroundImage: './img/bp01.png' }}
          className="bg-cover bg-center h-64 rounded-lg flex flex-col justify-end p-4"
        >
          <h3 className="text-2xl font-bold text-white mb-2">Women</h3>
          <button className="bg-white text-black p-2 rounded-md">
            Explore
          </button>
        </div>
      </div>

      <div
        className="w-1/3 p-4 cursor-pointer transform transition hover:scale-105"
        // onClick={onClick}
      >
        <div
          style={{ backgroundImage: './img/bp01.png' }}
          className="bg-cover bg-center h-64 rounded-lg flex flex-col justify-end p-4"
        >
          <h3 className="text-2xl font-bold text-white mb-2">Unisex</h3>
          <button className="bg-white text-black p-2 rounded-md">
            Explore
          </button>
        </div>
      </div>
    </div>
  )
}

export default FashionCards
