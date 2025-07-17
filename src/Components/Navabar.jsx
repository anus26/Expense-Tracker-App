import React from 'react'
import { Link } from 'react-router-dom'

const Navabar = () => {
  return (
 <>
 <nav className='bg-green-400 border-2 h-16  flex justify-between'>
  
<h1 className='text-white'>Expense Tracker App</h1>
<Link to='/Dashboard'>Dashboard</Link>
 </nav>
 </>
  )
}

export default Navabar