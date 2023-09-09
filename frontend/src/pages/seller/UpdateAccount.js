import React, { useState } from 'react'
import './form.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/navbar'

const updateSellerUrl = 'http://localhost:3008/api/v1/seller'

const UpdateAccount = () => {
  const { id } = useParams()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company_name, setCompany_name] = useState('')
  const [phone, setPhone] = useState('')
  const [website, setWebsite] = useState('')
  const [profile_image, setProfile_image] = useState('')
  const [reason, setReason] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const resp = await axios.patch(
        `${updateSellerUrl}/${id}`,
        {
          name: name,
          email: email,
          company_name: company_name,
          phone: phone,
          website: website,
          profile_image: profile_image,
          reason: reason,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      alert('Seller Account Updated Successfully')
      console.log(resp.data)
    } catch (error) {
      alert('Sorry! Seller Account Updation Failed...')
      console.log(error.response)
    }
  }

  return (
    <div>
      {/* <Navbar name="Iverson" /> */}
      <div className="title">
        <h2>Update Account Details</h2>
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
                      <label>User Name</label>
                      <input
                        type="text"
                        name="product_name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Update User Name"
                      ></input>
                    </div>

                    <div className="input-field">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="product_name"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Update User Email"
                      ></input>
                    </div>

                    <div className="input-field">
                      <label htmlFor="company_name">Company Name</label>
                      <input
                        type="text"
                        name="company_name"
                        id="company_name"
                        value={company_name}
                        onChange={(e) => setCompany_name(e.target.value)}
                        placeholder="Update Company Name"
                      ></input>
                    </div>

                    <div className="input-field">
                      <label htmlFor="phone">Contact Number</label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Update Contact Number"
                        min={9}
                        max={12}
                      ></input>
                    </div>

                    <div className="input-field">
                      <label htmlFor="website">Website</label>
                      <input
                        type="url"
                        name="website"
                        id="website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="Update Website"
                      ></input>
                    </div>

                    <div className="input-field">
                      <label htmlFor="profile_image">Profile Picture</label>
                      <input
                        type="file"
                        accept="image/png, image/jpg, image/jpeg"
                        crossOrigin="anonymous"
                        name="profile_image"
                        id="profile_image"
                        value={profile_image}
                        onChange={(e) => setProfile_image(e.target.value)}
                        placeholder="Upload New Profile Picture"
                      ></input>
                    </div>

                    <div className="input-field-desc">
                      <label htmlFor="reason">Reason</label>
                      <div></div>
                      <textarea
                        type="text"
                        name="reason"
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Update the Reason to Join"
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

export default UpdateAccount
