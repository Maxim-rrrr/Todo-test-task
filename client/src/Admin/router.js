import React, { useState, useEffect } from 'react'

import { Routes, Route, } from "react-router-dom";
import Login from "./Login"
import Tasks from './Tasks';

import { apiClient } from '../api/apiClient';

const AdminRouter = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  
  const checkToken = async () => {
    try {
      const isAdmin = await apiClient.admin.isAuth()
      
      if (isAdmin.success) {
        setIsAdmin(true)
      } else {
        localStorage.removeItem('auth_token')
      }

    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('auth_token')) {
      checkToken()
    }
  }, [])

  if (isAdmin) {
    return (
      <Routes>
        <Route exact path="/" element={<Tasks/>} />
      </Routes>
    )
  } else {
    return (
      <Routes>
        <Route path="/*" element={<Login/>} />
      </Routes>
    )
  }
  
};

export default AdminRouter;