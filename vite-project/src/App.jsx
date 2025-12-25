import { useState } from 'react'
import './App.css'
import Home from './Home/home'
import DashboardLayout from './components/Layout'
import Users from './Users/users'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/users' element={<Users />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  )
}

export default App
