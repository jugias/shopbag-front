import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from '../footer/Footer'
import Header from '../Headers/Header'

const LayoutUser = () => {
  return (
    
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default LayoutUser