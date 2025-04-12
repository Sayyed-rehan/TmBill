import React from 'react'
import { Routes, Route } from "react-router"
import Sign from './Pages/Sign/Sign'
import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/sign' element={<Sign />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />


      </Routes>
    </div>
  )
}

export default App
