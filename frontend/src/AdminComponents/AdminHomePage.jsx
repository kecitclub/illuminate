import React from 'react'
import Header from './Header';
import { Outlet } from 'react-router-dom';

const AdminHomePage = () => {
  return (
    <div className='h-screen w-full bg-theme-primary overflow-y-scroll'>
        <Header />
        <Outlet />
    </div>
  )
}

export default AdminHomePage;
