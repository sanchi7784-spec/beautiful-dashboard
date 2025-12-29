import { useState } from 'react'
import './App.css'
import Home from './Home/home'
import DashboardLayout from './components/Layout'
import Users from './Users/users'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
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
function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/users' element={<Users />} />
          <Route path='/products' element={<ProductsTable />} />
          <Route path='/orders' element={<OrdersList />} />
           <Route path='/categories' element={<Categories />} />
           <Route path='/vendors' element={<Vendors />} />
             <Route path='/profile' element={<Profile />} />
             <Route path='/business' element={<BusinessSettings />} />
             <Route path='/taxes' element={<TaxesUI />} />
              <Route path='/deliverycharge' element={<Deliverycharge />} />
                 <Route path='/logo' element={<Logo />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  )
}

export default App
