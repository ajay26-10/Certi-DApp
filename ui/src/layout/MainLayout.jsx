import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const Mainlayout = () => {
  return (
    <>
     <ToastContainer/>
    <Navbar/>
    <Outlet/>
   
    
    </>
  )
}

export default Mainlayout