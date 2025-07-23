import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdHome } from "react-icons/md";
import { RiLoginCircleLine } from "react-icons/ri";
import { RiLogoutCircleLine } from "react-icons/ri";
import { getAuth, signOut } from 'firebase/auth';
const Navabar = () => {
  const auth=getAuth()
  const navigate=useNavigate()
  const handleLogout=async()=>{

    try {
    await  signOut(auth)
      console.log('usersignedout');
      console.log(auth.currentUser);
      
      navigate('/login')
      
    } catch (error) {
      console.log(error.message);
      
    }
  }
  return (
 <>
 <nav className='      ' >
  <div className='flex gap-2 mt-5  '>

  <img src="./images/budgeting.png" alt="Tracking"  className='w-16'/>
<h1 className='text-white font-bold  text-2xl'>Expense Tracker App</h1>
  </div>
  <div className='flex  flex-col items-start justify-center mt-16 gap-10  sm:justify-between'>

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
    <div className='flex  items-end justify-end gap-2 p-4 '>
          <button  onClick={handleLogout} className='font-semibold flex items-end justify-end  bottom-10 left-0 absolute  hover:text-white w-32 h-10 transition-all duration-300 rounded-md'>
          <RiLogoutCircleLine className='text-2xl text-white ' />
            Logout
          </button>
        </div>
 </nav>
 </>
  )
}

export default Navabar