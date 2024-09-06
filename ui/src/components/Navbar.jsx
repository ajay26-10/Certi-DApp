import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (

    <>
    <div className='flex flex-row justify-end p-4'>
        <Link to="/" className="bg-blue-600 relative    text-white font-bold py-2 px-6 rounded-lg shadow-lg mr-2">Home</Link>
        <Link to="/certificate" className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg mr-2 border-1  px-8 py-2 " >Issue Certificate</Link>
    </div>
       


    </>
   
  )
}

export default Navbar