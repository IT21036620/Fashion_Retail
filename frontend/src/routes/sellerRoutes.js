import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import pages
import SingleProduct from '../pages/seller/SingleProduct'
import SellerProducts from '../pages/seller/SellerProducts'
import AddProduct from '../pages/seller/AddProduct'
import UpdateProduct from '../pages/seller/UpdateProduct'
import UpdateAccount from '../pages/seller/UpdateAccount'
import RegisterSeller from '../pages/seller/RegisterSeller'

function SellerRoutes() {
  return (
    <Routes>
      {/* seller product list */}
      <Route path="/seller" element={<SellerProducts />} />
      {/* seller get single product */}
      <Route path="/seller/:id" element={<SingleProduct />} />
      {/* seller add product */}
      <Route path="/seller/add-product" element={<AddProduct />} />
      {/* seller update product (product id)*/}
      <Route path="/seller/update-product/:id" element={<UpdateProduct />} />
      {/* seller delete product (seller id)*/}
      <Route path="/update/seller/:id" element={<UpdateAccount />} />
      {/* seller delete product (seller id)*/}
      <Route path="/seller/register" element={<RegisterSeller />} />
    </Routes>
  )
}

export default SellerRoutes
