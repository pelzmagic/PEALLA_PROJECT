import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Signup from '../pages/signup/Signup';
import Login from '../pages/login/Login';
import Dashboard from '../pages/dashboard/Dashboard';

export default function Router() {
  return (
    <>
        <Routes>
            <Route path='/' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
    </>
  )
}
