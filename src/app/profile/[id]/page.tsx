import React from 'react'

export default function UserProfile({params}:any) {

  return (
    <div className='flex justify-center items-center min-h-screen'>
        <h2 className='bg-red-600 p-4 rounded-lg'>{params.id}</h2>
        
    </div>
  )
}

