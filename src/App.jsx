import React from 'react'
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Navabar from './Components/Navabar'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
<>
<BrowserRouter>
<Navabar/>
<Routes>
<Route path='/Login'  excat element={<Login/>}/>


</Routes>
</BrowserRouter>
  <Toaster />
</>
  )
}

export default App
