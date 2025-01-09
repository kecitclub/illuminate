import React from 'react'
import Navigators from './Navigators';
import { Outlet } from 'react-router-dom';

const UserHomePage = () => {
  return (
    <div className='h-screen w-full bg-theme-primary text-black overflow-y-scroll'>
      <Navigators />
      <Outlet />
    </div>
  )
}

export default UserHomePage;
