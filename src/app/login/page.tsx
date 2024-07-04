'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default  function Loginpage() {
  const router=useRouter()
  const [user,setUser]=useState({
    email:"",
    password:""
})

const [loading,setLoading]=useState(false)
const [buttonDisabled,setButtonDisabled]=useState(false)


const handleChange=(e:any)=>{
  setUser({
   ...user,
   [e.target.id]:e.target.value})
}


const onLogin=async()=>{
  try {
   setLoading(true)
   const response= await axios.post('/api/users/login',user)
   console.log(response.data)
   router.push("/profile")

  //  setLoading(false)

  } catch (error:any) {
    console.log("api calling error",error.message)
    toast.error(error.message)
  }
}

useEffect(()=>{
if( user.email.length >0 && user.password.length >0 ){
  setButtonDisabled(false)
}else{
  setButtonDisabled(true)
}
},[user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1>{loading ? "Processing" : "Login"}</h1>
    <hr />
    
    <label htmlFor="email">email</label>
    <input 
    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        placeholder='email'
        value={user.email}
        onChange={handleChange}
        
        />
    <label htmlFor="password">password</label>
    <input 
    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        placeholder='password'
        onChange={handleChange}
        />
        <button
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No Login" : "Login"}</button>
        <Link href="/signup">Visit Signup page</Link>
    </div>
  )
}

