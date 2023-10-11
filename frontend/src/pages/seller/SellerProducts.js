import React from 'react'
import { AppProvider } from './context'
import '../../components/Seller/product.css'
import SellerProductList from '../../components/Seller/SellerProductList'
import Navbar from '../../components/navbar'

const SellerProducts = () => {
  return (
    <main>
      <AppProvider>
        {/* <Navbar name="Iverson" /> */}
        <div class="flex flex-col w-full h-full box-border bg-[color:#ffffff] pt-[30px] pb-5 px-[50px]">
          <SellerProductList />
        </div>
      </AppProvider>
    </main>
  )
}

export default SellerProducts
