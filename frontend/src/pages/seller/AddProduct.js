import React, { useState } from 'react'
import './form.css'
import axios from 'axios'
import Navbar from '../../components/navbar'

const productUrl = 'http://localhost:3008/api/v1/products'

const AddProduct = () => {
  const [product_name, setProduct_name] = useState('')
  const [manufacturer, setManufacturer] = useState('')
  const [price, setPrice] = useState('')
  const [package_quantity, setPackage_quantity] = useState('')
  const [shipping_weight, setShipping_weight] = useState('')
  const [category, setCategory] = useState('')
  const [mfd, setMfd] = useState('')
  const [exp, setExp] = useState('')
  const [image, setImage] = useState(null)
  const [description, setDescription] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(image)

    const formData = new FormData()
    formData.append('product_name', product_name)
    formData.append('manufacturer', manufacturer)
    formData.append('price', price)
    formData.append('package_quantity', package_quantity)
    formData.append('shipping_weight', shipping_weight)
    formData.append('category', category)
    formData.append('mfd', mfd)
    formData.append('exp', exp)
    formData.append('description', description)
    formData.append('image', image)
    try {
      const resp = await axios.post(
        productUrl,
        formData,
        // {
        //   product_name: product_name,
        //   manufacturer: manufacturer,
        //   price: price,
        //   package_quantity: package_quantity,
        //   shipping_weight: shipping_weight,
        //   category: category,
        //   mfd: mfd,
        //   exp: exp,
        //   image: image,
        //   description: description,
        // },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDM5OWRmNDBmMDhjYjYyNjg5MmQ3ZGQiLCJuYW1lIjoiIiwiaWF0IjoxNjgyODY3Mzg4LCJleHAiOjE2ODU0NTkzODh9.oAAzQNJhV9Oh32BV_hiU1zFoxYlBpa_4W2qJSSotTdw`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      alert('Product Added Successfully')
      console.log(resp.data)
    } catch (error) {
      alert('Sorry! Product Creation Failed...')
      console.log(error.response)
    }
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  // function generateFileName(originalName) {
  //   const timestamp = new Date().getTime()
  //   const extension = originalName.split('.').pop()
  //   return `${timestamp}.${extension}`
  // }

  return (
    <div class="bg-[#ffffff]">
      {/* <Navbar name="Iverson" /> */}
      <div className="title">
        <h2>Add New Product</h2>
        <div className="underline"></div>
      </div>
      <div className="main-form">
        <div className="form-body">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
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
                        placeholder="Enter Product Name"
                        required
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
                        placeholder="Enter Manufacturer Name"
                        required
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
                        placeholder="Enter Price in LKR"
                        min={1}
                        required
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
                        placeholder="Enter Package Quantity"
                        min={1}
                        required
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
                        placeholder="Enter Shipping Weight in g/kg"
                        required
                      ></input>
                    </div>

                    <div className="input-field">
                      <label htmlFor="category">Category</label>
                      <select
                        name="category"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      >
                        <option
                          class="text-gray-400"
                          value=""
                          disabled
                          defaultValue={'Choose a Category'}
                          hidden
                        >
                          Choose a Category
                        </option>
                        <option value="Supplements and Herbs">
                          Supplements & Herbs
                        </option>
                        <option value="Sports Nutrition">
                          Sports Nutrition
                        </option>
                        <option value="Beauty">Beauty</option>
                        <option value="Bath and Personal Care">
                          Bath & Personal Care
                        </option>
                        <option value="Grocery">Grocery</option>
                        <option value="Home">Home</option>
                        <option value="Pets">Pets</option>
                        <option value="Babies and Kids">Babies & Kids</option>
                      </select>
                    </div>

                    <div className="input-field">
                      <label htmlFor="mfd">Manufacture Date</label>
                      <input
                        type="date"
                        name="mfd"
                        id="mfd"
                        value={mfd}
                        onChange={(e) => setMfd(e.target.value)}
                        placeholder="Enter Mfd"
                        required
                      ></input>
                    </div>

                    <div className="input-field">
                      <label htmlFor="exp">Expiry Date</label>
                      <input
                        type="date"
                        name="exp"
                        id="exp"
                        value={exp}
                        onChange={(e) => setExp(e.target.value)}
                        placeholder="Enter Exp"
                        required
                      ></input>
                    </div>

                    <div className="input-field">
                      <label htmlFor="image">Product Image</label>
                      <input
                        type="file"
                        accept="image/png, image/jpg, image/jpeg"
                        crossOrigin="anonymous"
                        name="image"
                        id="image"
                        // value={image}
                        // onChange={(e) => setImage(e.target.value)}
                        onChange={handleImageChange}
                        placeholder="Upload Product Image"
                        required
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
                        placeholder="Enter a Product Description"
                        required
                      ></textarea>
                    </div>

                    <button
                      class="m-auto bg-green-500 mt-[20px] hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded"
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

export default AddProduct
