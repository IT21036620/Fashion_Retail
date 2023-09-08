import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import pages
import Products from '../pages/products/Products'
import SingleProduct from '../pages/products/SingleProduct'

// import components

function ProductRoutes() {
  return (
    <Routes>
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<SingleProduct />} />
    </Routes>
  )
}

export default ProductRoutes
