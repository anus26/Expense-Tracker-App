import React from 'react'
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Navabar from './Components/Navabar'
import { Toaster } from 'react-hot-toast'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
<>
<BrowserRouter>
<div className='flex  h-screen'>
<div className=" w-64 h-full p-4 bg-green-600 border-2 text-white  ">
    <Navabar />
  </div>


  <div className='flex-1 '>

<Routes>
<Route path='/Login'  excat element={<Login/>}/>
<Route path='/dashboard' excat element={<Dashboard/>}/>



</Routes>
  </div>
</div>
</BrowserRouter>
  <Toaster />
</>
  )
}

export default App
