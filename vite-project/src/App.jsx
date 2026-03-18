import { useState, useEffect } from 'react'
import './App.css'
import Home from './Home/home'
import DashboardLayout from './components/Layout'
import Users from './Users/users'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import ProductsTable from './Products/products'
import OrdersList from './orders/OrdersList'
import Categories from './Categories/Categories'
import Vendors from './Vendors/Vendors'
import Profile from './Profile/Profile'
import  BusinessSettings from './BusinessSetup/BusinessSetup';
import TaxesUI from './BusinessSetup/Tax'
import BusinessSetup from './BusinessSetup/BusinessSetup'
import Deliverycharge from './BusinessSetup/Deliverycharge'
import Logo from './logo/logo'
import Login from './login/login'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Initialize from localStorage
    return localStorage.getItem('isAuthenticated') === 'true'
  })

  useEffect(() => {
    // Persist to localStorage whenever authentication state changes
    localStorage.setItem('isAuthenticated', isAuthenticated)
  }, [isAuthenticated])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('isAuthenticated')
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Login Route - First page */}
        <Route 
          path='/login' 
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login onLogin={handleLogin} />
          } 
        />
        
        {/* Protected Dashboard Routes */}
        {isAuthenticated ? (
          <Route path="/*" element={<DashboardLayout onLogout={handleLogout} />}>
            <Route index element={<Home />} />
            <Route path='dashboard' element={<Home />} />
            <Route path='users' element={<Users />} />
            <Route path='products' element={<ProductsTable />} />
            <Route path='orders' element={<OrdersList />} />
            <Route path='categories' element={<Categories />} />
            <Route path='vendors' element={<Vendors />} />
            <Route path='profile' element={<Profile />} />
            <Route path='business' element={<BusinessSettings />} />
            <Route path='taxes' element={<TaxesUI />} />
            <Route path='deliverycharge' element={<Deliverycharge />} />
            <Route path='logo' element={<Logo />} />
          </Route>
        ) : (
          <Route path="/*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default App
