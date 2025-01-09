import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='h-screen w-full bg-[rgba(10,10,30)] text-gray-200 flex justify-center items-center flex-col gap-6'>
        <h1 className=' text-3xl text-red-500'>Some Error Occurred</h1>
        <div className='h-auto w-[20%] flex justify-center items-center gap-4'>
            <Link to={''} className='bg-orange-600 px-6 py-2 rounded text-black'>Go Back</Link>
            <Link to={'/'} className='bg-orange-600 px-6 py-2 rounded text-black'>Home</Link>
        </div>
    </div>
  )
}

export default ErrorPage
