import React from 'react'
import DashboardStatGrid from './DashboardStatGrid'
import OrdersAdmin from './OrdersAdmin'

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <DashboardStatGrid />
      <div className="flex flex-row gap-4 w-full">
        <OrdersAdmin />
      </div>
    </div>
  )
}
