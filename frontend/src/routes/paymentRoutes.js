import { Routes, Route } from 'react-router-dom'
import Payment from '../components/Payments/PaymentHome'

const paymentRoutes = () => {
  return (
    <Routes>
      <Route path="payment" element={<Payment />} />
    </Routes>
  )
}

export default paymentRoutes
