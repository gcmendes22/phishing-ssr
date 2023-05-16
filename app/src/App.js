import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main"
import PhoneNumber from "./PhoneNumber"

export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/phone-number" element={<PhoneNumber />} />
        </Routes>
      </BrowserRouter>
    )
}