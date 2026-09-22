import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './components/Login/Login'
import AdminHome from './components/AdminHome'
import UserHome from './components/UserHome'

import { AuthProvider } from './authContext/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

import CreateAccount from './components/Pages/Admin/CreateAccount'
import DeleteAccount from './components/Pages/Admin/DeleteAccount'
import AccountTransactions from './components/Pages/Admin/AccountTransactions'
import Notifications from './components/Pages/Admin/Notifications'
import UpdateAccount from './components/Pages/Admin/UpdateAccount'


import Balance from './components/Pages/User/Balance'
import CreateUpdatePin from './components/Pages/User/CreateUpdatePin'
import RequestToAdmin from './components/Pages/User/RequestToAdmin'
import SendMoney from './components/Pages/User/SendMoney'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRole="admin">
        <AdminHome />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/createAccount',
    element: (
      <ProtectedRoute allowedRole="admin">
        <CreateAccount />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/deleteAccount',
    element: (
      <ProtectedRoute allowedRole="admin">
        <DeleteAccount />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/transactions',
    element: (
      <ProtectedRoute allowedRole="admin">
        <AccountTransactions />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/notifications',
    element: (
      <ProtectedRoute allowedRole="admin">
        <Notifications />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/updateAccount',
    element: (
      <ProtectedRoute allowedRole="admin">
        <UpdateAccount />
      </ProtectedRoute>
    ),
  },
  {
    path: '/user',
    element: (
      <ProtectedRoute allowedRole="user">
        <UserHome />
      </ProtectedRoute>
    ),
  },
  {
    path: '/user/checkBalance',
    element: (
      <ProtectedRoute allowedRole="user">
        <Balance />
      </ProtectedRoute>
    ),
  },
  {
    path: '/user/request',
    element: (
      <ProtectedRoute allowedRole="user">
        <RequestToAdmin />
      </ProtectedRoute>
    ),
  },
  {
    path: '/user/pin',
    element: (
      <ProtectedRoute allowedRole="user">
        <CreateUpdatePin />
      </ProtectedRoute>
    ),
  },
  {
    path: '/user/sendMoney',
    element: (
      <ProtectedRoute allowedRole="user">
        <SendMoney />
      </ProtectedRoute>
    ),
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)