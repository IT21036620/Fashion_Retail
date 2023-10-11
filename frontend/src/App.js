import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import IndexRoutes from './routes'
import Navbar from './components/navbar'

import HomeReview from './components/HomeReview/HomeReview'

function App() {
  return (
    <div className="App">
      {/* <HomeReview /> */}
      <BrowserRouter>
        {/* <Navbar /> */}
        <IndexRoutes />
      </BrowserRouter>
    </div>
  )
}

export default App
