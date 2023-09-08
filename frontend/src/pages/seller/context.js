import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'
import axios from 'axios'

const url = 'http://localhost:3008/api/v1/seller'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('a')
  const [products, setProducts] = useState([])

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDM5OWRmNDBmMDhjYjYyNjg5MmQ3ZGQiLCJuYW1lIjoiSXZlcnNvbiIsImlhdCI6MTY4MjAwNDc4OCwiZXhwIjoxNjg0NTk2Nzg4fQ.1yFUxCHwoDBlobtxfPll8GI5IEOEXwWYluqFFlkvjQg`,
          },
        })
        .then((res) => {
          // console.log(res.data)
          const data = res.data
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
        })
        .catch((error) => {
          console.error(error)
        })
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }, [searchTerm])
  useEffect(() => {
    fetchProducts()
  }, [searchTerm, fetchProducts])

  return (
    <AppContext.Provider
      value={{
        loading,
        products,
        setSearchTerm,
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
