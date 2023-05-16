import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main"
import Dashboard from "./Dashboard"

export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    )
}