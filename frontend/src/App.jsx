import React from 'react'
import LandingPage from './LandingComponents/LandingPage';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import ErrorPage from './ExtraComponents/ErrorPage';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './handles/AuthProvider';
import InitialRoute from './InitialRoute';
import Complaints from './UserPageComponents/Complaints';
import IssueComplaintPage from './UserPageComponents/IssueComplaintPage';
import MyComplaints from './UserPageComponents/MyComplaints';
import ChatBot from './UserPageComponents/ChatBot';
import AdminLoginRoute from './AdminComponents/AdminLoginRoute';
import AdminAuthProvider from './handles/AdminAuthProvider';
import VerifyComplaint from './AdminComponents/VerifyComplaint';


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
      {
        path: 'issueComplaints/',
        element: <IssueComplaintPage />,
        errorElement: <ErrorPage />
      },
      {
        path: 'myComplaints/',
        element: <MyComplaints />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'chatbot/',
        element: <ChatBot />,
        errorElement: <ErrorPage />,
      }
    ]
  },
  {
    path: 'admin/',
    element: <AdminLoginRoute />,
    children: [
      {
        path: '',
        element: <VerifyComplaint />,
        errorElement: <ErrorPage />,
      }
    ]
  }
])
const App = () => {

  return (
    <>
    <AdminAuthProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer limit={5} />
      </AuthProvider>
    </AdminAuthProvider>
    </>
  )
}

export default App
