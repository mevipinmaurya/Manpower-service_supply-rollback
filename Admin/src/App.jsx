import React from 'react'
import Admin from './Pages/Admin.jsx'
import Navbar from './Components/Navbar.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from "react-hot-toast"

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Navbar />
      <Admin />
    </BrowserRouter>
  )
}

export default App