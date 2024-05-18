import React from 'react'
import { Outlet } from 'react-router-dom'
import App from './App'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const Layout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout