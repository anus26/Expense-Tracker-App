import React from 'react'
import { Link } from 'react-router-dom'
import { MdHome } from "react-icons/md";
import { RiLoginCircleLine } from "react-icons/ri";
const Navabar = () => {
  return (
 <>
 <nav className='      ' >
  <div className='flex gap-2 mt-5'>

  <img src="./images/budgeting.png" alt="Tracking"  className='w-16'/>
<h1 className='text-white font-bold  text-2xl'>Expense Tracker App</h1>
  </div>
  <div className='flex  flex-col items-start justify-center mt-16 gap-10 '>

<div className={`flex  items-center gap-3 p-3   rounded-md transition-all duration-300 ${onclick ? 'border':'hover:bg-slate-400'}`}>
  <MdHome className='w-6 h-6 text-white'   />
  <Link
    to='/Dashboard'
    className='font-semibold text-xl text-white hover:text-black transition-colors duration-300'
  >
    Dashboard
  </Link>
</div>

<div className={`flex items-center gap-3 p-3   rounded-md transition-all duration-300 ${onclick ? 'border':'hover:bg-slate-400'}`}>
<RiLoginCircleLine  className='w-6 h-6 text-whtie'/>
<Link to='/Login'  className='font-semibold text-xl hover:text-black transition-all duration-300'>Login</Link>
</div>
  </div>
 </nav>
 </>
  )
}

export default Navabar