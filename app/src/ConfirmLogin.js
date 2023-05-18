import "./assets/app.css";
import logo from "./assets/logo.png"
import {useState, useEffect} from 'react';
import * as React from "react";
import axios from "axios"
import { Redirect, useSearchParams } from 'react-router-dom';
import auth from './services/authService';

const ConfirmLogin = () => {

  const [email, setEmail] = useState("")
  const [token, setToken] = useState("")
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    setEmail(searchParams.get("email"))
    
  }, [])

  const handleToken = (e) => {
    setToken(e.target.value)
  }

  async function confirmLogin(email, token) {
    try {
        const res = await auth.confirmLogin(email, token)

        global.window.location.href = "/home?email=" + email
      }  catch(err) {
        console.log(err)
      }
  } //guilhermecostamendes00@gmail.com

  const handleSubmit = (e) => {
    confirmLogin(email, token)
  }

  return (
    <div className="App" >
        <div id="section_uname" className=" ">
            <div className="auth-wrapper">

            <h2 className="title mb-16 mt-16">Please login to contact you about your order!</h2>
            <form>
                <div className="mb-16">
                    <small>Email: {email}</small>
                    <input id="inp_uname" type="text" name="uname" className="input" onChange={handleToken} value={token} placeholder="Code" />
                </div>
            </form>
            
            <div>
                <button className="btn" onClick={handleSubmit} id="btn_next">Confirm</button>
            </div>
            </div>
        </div>
    
        <footer className="footer">
            <a href="#">Terms of use</a>
            <a href="#">Privacy & cookies</a>
            <span>.&nbsp;.&nbsp;.</span>
        </footer>
    </div>
  )
}

export default ConfirmLogin;
