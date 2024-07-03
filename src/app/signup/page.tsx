'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default  function SignupPage() {

  const router=useRouter()
  const [loading,setLoading]=useState(false)
  const [buttonDisabled,setButtonDisabled]=useState(false)

  const [user,setUser]=useState({
        username:"",
        email:"",
        password:""
  })
  

  const handleChange=(e:any)=>{
         setUser({
          ...user,
          [e.target.id]:e.target.value})
  }

  const onSignup=async()=>{
        try {
         setLoading(true)
         const response= await axios.post('/api/users/signup',user)
         console.log(response.data)
         router.push("/login")
     
        //  setLoading(false)

        } catch (error:any) {
          console.log("api calling error",error.message)
          toast.error(error.message)
        }
  }

  useEffect(()=>{
      if(user.username.length >0 && user.email.length >0 && user.password.length >0 ){
        setButtonDisabled(false)
      }else{
        setButtonDisabled(true)
      }
  },[user])


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1>{loading ? "Processing" : "Signup"}</h1>
    <hr />
    <label htmlFor="username">username</label>
    <input 
    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="username"
        type="text"
        placeholder='username'
        value={user.username}
        onChange={handleChange}
       
        />
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
        onClick={onSignup}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No signup" : "Signup"}</button>
        <Link href="/login">Visit login page</Link>
    </div>
  )
}

