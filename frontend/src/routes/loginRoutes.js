import { Routes, Route } from 'react-router-dom'
import Layout from '../pages/Layout'
import Dashboard from '../components/Dashboard/Dashboard'
import Sellers from '../components/Dashboard/Sellers'
import ViewOrder from '../components/Dashboard/ViewOrder'
import Login from '../pages/Login'

export default function LoginRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}
