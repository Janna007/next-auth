'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'


export default  function VerifyEmailPage() {
  const [token,setToken]=useState("")
  const [verified,setVerified]=useState(false)
  

  useEffect(()=>{
      const urlToken= window.location.search.split("=")[1]
      setToken(urlToken || "")
      
  },[])
  
  return (
    <div className='flex justify-center items-center flex-col min-h-screen gap-6'>
       <h2 className='text-2xl  '>Verify Email</h2>
       <p className='bg-red-800 p-4 rounded-lg'>{token?`${token}`:"No token"}</p>

       {verified && (
        <div>
        <h2 className='bg-green-600 p-4 mb-4'>Email verified</h2>
        <Link href={"/login"}>
           
            <h2 className='bg-white p-4 rounded-xl text-black text-center'>Login</h2>
         
        </Link>
          
        </div>
       )}
    </div>
  )
}

