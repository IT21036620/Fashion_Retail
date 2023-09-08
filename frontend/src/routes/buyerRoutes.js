import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import AccountPage from '../pages/buyer/AccountPage'
import Navbar from '../components/navbar'
import ReviewForm from '../components/Reviews/createReviews'

const buyerRoutes = () => {
  return (
    <div>
      <Navbar name={'Sunil Perera'} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buyer/account" element={<AccountPage />} />
        <Route path="/review" element={<ReviewForm />} />
      </Routes>
    </div>
  )
}

export default buyerRoutes
