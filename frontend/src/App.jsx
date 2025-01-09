import React from 'react'
import LandingPage from './LandingComponents/LandingPage';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import ErrorPage from './ExtraComponents/ErrorPage';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './handles/AuthProvider';
import InitialRoute from './InitialRoute';
import Complaints from './UserPageComponents/Complaints';


const router = createBrowserRouter([
  {
    path: "/",
    element: <InitialRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Complaints />,
        errorElement: <ErrorPage />
      },
    ]
  }
])
const App = () => {

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer limit={5} />
      </AuthProvider>
    </>
  )
}

export default App
