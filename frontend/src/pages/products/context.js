import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'
import axios from 'axios'

const url = 'http://localhost:3008/api/v1/products'
const search = 'http://localhost:3008/api/v1/products?product_name='
const cat = '&category='

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchCat, setSearchCat] = useState('')
  const [products, setProducts] = useState([])

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(`${search}${searchTerm}${cat}${searchCat}`)
      const data = await response.json()
      // const data = response
      const { products } = data
      if (products) {
        const newProducts = products.map((item) => {
          const {
            _id,
            availability,
            rating,
            product_name,
            manufacturer,
            package_quantity,
            price,
            mfd,
            exp,
            shipping_weight,
            category,
            description,
            image,
            rate_count,
            createdBy,
          } = item
          return {
            id: _id,
            availability,
            rating,
            product_name,
            manufacturer,
            package_quantity,
            price,
            mfd,
            exp,
            shipping_weight,
            category,
            description,
            image,
            rate_count,
            createdBy,
          }
        })
        setProducts(newProducts)
      } else {
        setProducts([])
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }, [searchTerm, searchCat])
  useEffect(() => {
    fetchProducts()
  }, [searchTerm, searchCat, fetchProducts])

  return (
    <AppContext.Provider
      value={{
        loading,
        products,
        setSearchTerm,
        setSearchCat,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
