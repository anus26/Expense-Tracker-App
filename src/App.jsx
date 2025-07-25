import React, { useState } from 'react'
import { BrowserRouter ,Routes,Route, Navigate} from 'react-router-dom'
import Login from './pages/Login'
import Navabar from './Components/Navabar'
import { Toaster } from 'react-hot-toast'
import { useAuth } from './Context/AuthContext'
import Dashboard from './pages/Dashboard'

const App = () => {
  const [login, setLogin]=useState()
  const {currentUser}=useAuth()
  console.log(currentUser);
  
  return (
<>
<BrowserRouter>
<div className='flex  flex-col md:flex-row h-screen  '>
  <div className="block md:hidden w-full bg-green-600 text-white p-4">
    <Navabar />
  </div>

  {/* 💻 Desktop Navbar (Sidebar) */}
  <div className="hidden md:block w-64 h-full p-4 bg-green-600 text-white">
    <Navabar />
  </div>


  <div className='flex-1 '>

<Routes>
  <Route
    path="/"
    element={currentUser ? <Dashboard /> : <Navigate to="/login" />}
  />
  <Route
    path="/login"
    element={!currentUser ? <Login /> : <Navigate to="/" />}
  />
</Routes>
  </div>
</div>
</BrowserRouter>
  <Toaster />
</>
  )
}

export default App
