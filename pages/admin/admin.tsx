'use client'

import { useState,useEffect } from 'react'
import AdminDashboard from '../../common/app/components/AdminDashboard'
import LoadingPage from '@/common/app/components/LoadingPage'

import Cookie from 'js-cookie';
import { useRouter } from 'next/router';

export default function AdminPage() {
  const router = useRouter()

  const [showLoader,setShowLoader]=useState<boolean>(true)
  useEffect(() =>{
    setShowLoader(true)
    const authToken = Cookie.get('auth_token');
    if(!authToken)
    {
      router.push('/admin/login')
    }
    else{
      setShowLoader(false)
    }
    console.log(authToken);

  })
  return (
    <>
        {
      showLoader ? <LoadingPage/> :      <AdminDashboard />
    }
    </>

  )
}

