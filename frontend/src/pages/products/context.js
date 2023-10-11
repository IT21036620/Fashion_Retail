import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'
import axios from 'axios'

const url = 'http://localhost:4000/api/v1/items'
const search = 'http://localhost:4000/api/v1/items?item_name='
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
      const { items } = data
      if (items) {
        const newProducts = items.map((item) => {
          const {
            _id,
            availability,
            rating,
            item_name,
            manufacturer,
            price,
            category,
            clothing_type,
            description,
            image,
            size,
            rate_count,
          } = item
          return {
            id: _id,
            availability,
            rating,
            item_name,
            manufacturer,
            price,
            category,
            clothing_type,
            description,
            image,
            size,
            rate_count,
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
