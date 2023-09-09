import { Routes, Route } from 'react-router-dom'
import CartPage from '../components/delivery/deliveryCheckout'

export default function DeliveryRoutes() {
  return (
    <Routes>
      <Route path="/checkout" element={<CartPage />} />
    </Routes>
  )
}
