import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch, Redirect, Routes } from 'react-router-dom'
import auth from './services/authService'
import LoginPage from "./LoginPage"
import ConfirmLogin from "./ConfirmLogin"
import HomePage from './HomePage'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {

  const [user, setUser] = useState()

  useEffect(() => {
    const currentUser = auth.getCurrentUser()
    setUser(currentUser)
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/confirm-login" element={<ConfirmLogin />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}