import { Routes, Route } from 'react-router-dom'
import ErrorPage from '../pages/error'

const ErrorRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  )
}

export default ErrorRoute
