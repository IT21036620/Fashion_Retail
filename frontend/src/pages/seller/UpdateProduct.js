import React, { useState } from 'react'
import './form.css'
import axios from 'axios'
import { useLocation, useParams } from 'react-router-dom'
import Navbar from '../../components/navbar'

const updateProductUrl = 'http://localhost:3008/api/v1/products'

const UpdateProduct = () => {
  const { id } = useParams()
  const location = useLocation()
  const [product_name, setProduct_name] = useState(location.state.product_name)
  const [manufacturer, setManufacturer] = useState(location.state.manufacturer)
  const [price, setPrice] = useState(location.state.price)
  const [package_quantity, setPackage_quantity] = useState(
    location.state.package_quantity
  )
  const [shipping_weight, setShipping_weight] = useState(
    location.state.shipping_weight
  )
  const [availability, setAvailability] = useState(location.state.availability)
  const [category, setCategory] = useState(location.state.category)
  const [image, setImage] = useState(location.state.image)
  const [description, setDescription] = useState(location.state.description)

  console.log(location.state)

  const handleUpdateSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('product_name', product_name)
    formData.append('manufacturer', manufacturer)
    formData.append('price', price)
    formData.append('package_quantity', package_quantity)
    formData.append('shipping_weight', shipping_weight)
    formData.append('category', category)
    formData.append('description', description)
    formData.append('image', image)

    try {
      const resp = await axios.patch(
        `${updateProductUrl}/${id}`,
        formData,
        // {
        //   product_name: product_name,
        //   manufacturer: manufacturer,
        //   price: price,
        //   package_quantity: package_quantity,
        //   shipping_weight: shipping_weight,
        //   availability: availability,
        //   category: category,
        //   image: image,
        //   description: description,
        // },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      alert('Product Updated Successfully')
      console.log(resp.data)
    } catch (error) {
      alert('Sorry! Product Updation Failed...')
      console.log(error.response)
    }
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  return (
    <div>
      {/* <Navbar name="Iverson" /> */}
      <div className="title">
        <h2>Update Product</h2>
        <div className="underline"></div>
      </div>
      <div className="main-form">
        <div className="form-body">
          <div className="form-container">
            <form onSubmit={handleUpdateSubmit}>
              <div className="form first">
                <div className="details-personal">
                  <div className="fields">
                    <div className="input-field">
                      <label htmlFor="product_name">Product Name</label>
                      <input
                        type="text"
                        name="product_name"
                        id="product_name"
                        value={product_name}
                        onChange={(e) => setProduct_name(e.target.value)}
                        placeholder="Update Product Name"
                      ></input>
                    </div>

                    <div className="input-field">
                      <label htmlFor="manufacturer">Manufacturer</label>
                      <input
                        type="text"
                        name="manufacturer"
                        id="manufacturer"
                        value={manufacturer}
                        onChange={(e) => setManufacturer(e.target.value)}
                        placeholder="Update Manufacturer Name"
                      ></input>
                    </div>

                    <div className="input-field">
                      <label htmlFor="price">Price</label>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Update Price in LKR"
                        min={1}
                      ></input>
                    </div>

                    <div className="input-field">
                      <label htmlFor="package_quantity">Package Quantity</label>
                      <input
                        type="number"
                        name="package_quantity"
                        id="package_quantity"
                        value={package_quantity}
                        onChange={(e) => setPackage_quantity(e.target.value)}
                        placeholder="Update Package Quantity"
                        min={1}
                      ></input>
                    </div>

                    <div className="input-field">
                      <label htmlFor="shipping_weight">Shipping Weight</label>
                      <input
                        type="text"
                        name="shipping_weight"
                        id="shipping_weight"
                        value={shipping_weight}
                        onChange={(e) => setShipping_weight(e.target.value)}
                        placeholder="Update Shipping Weight in g/kg"
                      ></input>
                    </div>

                    <div className="input-field">
                      <label htmlFor="availability">Product Availability</label>
                      <select
                        name="availability"
                        id="availability"
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                      >
                        <option value="true">Available</option>
                        <option value="false">Sold-Out</option>
                      </select>
                    </div>

                    <div className="input-field">
                      <label htmlFor="category">Category</label>
                      <select
                        name="category"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="Supplements & Herbs">
                          Supplements and Herbs
                        </option>
                        <option value="Sports Nutrition">
                          Sports Nutrition
                        </option>
                        <option value="Beauty">Beauty</option>
                        <option value="Bath & Personal Care">
                          Bath and Personal Care
                        </option>
                        <option value="Grocery">Grocery</option>
                        <option value="Home">Home</option>
                        <option value="Pets">Pets</option>
                        <option value="Babies & Kids">Babies and Kids</option>
                      </select>
                    </div>

                    <div className="input-field">
                      <label htmlFor="image">Product Image</label>
                      <input
                        type="file"
                        accept="image/png, image/jpg, image/jpeg"
                        crossOrigin="anonymous"
                        name="image"
                        id="image"
                        onChange={handleImageChange}
                        // onChange={fileChangedHandler}
                        placeholder="Upload New Product Image"
                      ></input>
                    </div>

                    <div className="input-field-desc">
                      <label htmlFor="description">Product Description</label>
                      <div></div>
                      <textarea
                        type="text"
                        name="description"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Update Product Description"
                      ></textarea>
                    </div>

                    <button
                      class="m-auto bg-green-500 mt-[20px] mb-[20px] hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded"
                      type="submit"
                      name="submit"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateProduct
