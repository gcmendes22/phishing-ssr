import "./assets/app.css";
import logo from "./assets/logo.png"
import {useState, useEffect} from 'react';
import * as React from "react";
import axios from "axios"
import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom"
import auth from './services/authService'
const HomePage = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [searchParams, setSearchParams] = useSearchParams()
    
  const init = async () => {
      setEmail(searchParams.get("email"))
      const res = await auth.getUserByEmail("guilhermecostamendes00@gmail.com")
      setName(res.data.user.name)
      setPhoneNumber(res.data.user.phoneNumber)

  }

  useEffect(() => {init()}, [])

  return (
    
    <div className="App">

      <h2>Welcome {name}</h2>

      <h5>Phone Number: {phoneNumber}</h5>
   
      <footer className="footer">
          <a href="#">Terms of use</a>
          <a href="#">Privacy & cookies</a>
          <span>.&nbsp;.&nbsp;.</span>
      </footer>
    </div>
  )
}

export default HomePage