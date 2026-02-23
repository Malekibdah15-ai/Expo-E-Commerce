import React from 'react'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import {Navigate ,Route, Routes} from "react-router"
import { useAuth } from '@clerk/clerk-react';
import DashboardLayout from './Layout/DashboardLayout'
import LoginPage from './pages/loginPage'
import DashboardPage from './pages/DashboardPage'
import ProductsPage from './pages/ProductsPage'
import OrdersPage from './pages/Orders'
import CustomersPage from './pages/CustomersPage'
import PageLouder from './components/PageLouder'
function App() {

  const {isSignedIn, isLoaded} = useAuth() 
  if(!isLoaded) return <PageLouder/>
    
  return (
    <>
     <Routes>
      <Route path="/login" element={isSignedIn ? <Navigate to= {"/dashpoard"}/> :<LoginPage />}/>
      <Route path='/' element = {isSignedIn ? <DashboardLayout/> : <Navigate to = {"/login" }/>} >
      <Route index element= {<Navigate to={"dashboard"}/>}/>
      <Route path='dashboard' element={<DashboardPage/>}/>
      <Route path='products' element={<ProductsPage/>}/>
      <Route path='orders' element={<OrdersPage/>}/>
      <Route path='customers' element={<CustomersPage/>}/>
      </Route>
     </Routes>

    </>

  )
}

export default App
    