'use client'

import { SessionProvider } from 'next-auth/react'
import AdminDashboard from '../components/AdminDashboard'

export default function AdminPage() {
  return (
    <SessionProvider>
      <AdminDashboard />
    </SessionProvider>
  )
}

