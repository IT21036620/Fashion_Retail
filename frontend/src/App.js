import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import IndexRoutes from './routes'
import Navbar from './components/navbar'
import Footer from '../src/components/footer'

import HomeReview from './components/HomeReview/HomeReview'

function App() {
  return (
    <div className="App">
      {/* <HomeReview /> */}
      <BrowserRouter>
        {/* <Navbar /> */}
        <IndexRoutes />
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
