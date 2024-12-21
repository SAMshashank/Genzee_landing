'use client'

import { SessionProvider } from 'next-auth/react'
import AdminDashboard from '../../common/app/components/AdminDashboard'

export default function AdminPage() {
  return (
    <SessionProvider>
      <AdminDashboard />
    </SessionProvider>
  )
}

