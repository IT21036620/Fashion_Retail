import { Routes, Route } from 'react-router-dom'
import Layout from '../pages/Layout'
import Dashboard from '../components/Dashboard/Dashboard'
import Sellers from '../components/Dashboard/Sellers'
import Customers from '../components/Dashboard/AllCustomers'
import Orders from '../components/Dashboard/Orders'
import OrdersAdmin from '../components/Dashboard/OrdersAdmin'
import RequireAuth from '../components/login/RequireAuth'

export default function adminRoutes() {
  return (
    <Routes>
      {/* <Route element={<RequireAuth allowedRole={'admin'} />}> */}
      <Route path="/admin" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="sellers" element={<Sellers />} />
        <Route path="OrdersAdmin" element={<OrdersAdmin />} />
        <Route path="customers" element={<Customers />} />
        <Route path="orders" element={<Orders />} />
      </Route>
      {/* </Route> */}
    </Routes>
  )
}
