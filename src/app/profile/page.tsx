'use client'

import React, { useState } from 'react'
import axios from 'axios'
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import Link from 'next/link';

export default function ProfilePage() {

  const router = useRouter()

  const [data,setData]=useState(null)

  const getUserProfile=async()=>{
       try {
         const response=await axios.get("/api/users/profile")
         console.log(response.data.data._id)
         setData(response.data.data._id)  
       } catch (error:any) {
        console.log(error.message);
        toast.error(error.message)
       }
  }

  const logout=async()=>{
    try {
      await axios.get("/api/users/logout")
      toast.success('Logout successful')
      router.push('/login')
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message)
    }
      
  }


  return (
    <div className='flex justify-center items-center min-h-screen flex-col'> 
     <h2 className='text-4xl '>Profile Page</h2>

    
     <button className='bg-green-600 rounded-xl text-center p-4 mt-4' 
        onClick={getUserProfile}> 
         Get User Profile
     </button>
          <Link href={`/profile/${data}`}>
          <h2>{data}</h2>
          </Link>
     
     <button className='bg-red-600 rounded-xl text-center p-4 mt-4'
        onClick={logout}> 
         Logout
     </button>
    </div>
  )
}

