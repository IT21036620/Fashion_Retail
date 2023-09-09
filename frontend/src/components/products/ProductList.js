import React from 'react'
import Product from './Product'
import Loading from './Loading'
import { useGlobalContext } from '../../pages/products/context'
import './component.css'

const ProductList = () => {
  const { products, loading } = useGlobalContext()

  if (loading) {
    return <Loading />
  }
  if (products.length < 1) {
    return (
      <h2 className="section-title">
        No Products Matched Your Search Criteria
      </h2>
    )
  }

  const listItems = products.map((item) => <Product key={item.id} {...item} />)

  return <div className="main_content">{listItems}</div>
}

export default ProductList
