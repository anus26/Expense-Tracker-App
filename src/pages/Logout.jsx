import React from 'react'
import { RiLogoutCircleLine } from "react-icons/ri";

const Logout = () => {



    
  return (
    <>
      <div className='flex items-end justify-end gap-2 p-4'>
        <RiLogoutCircleLine className='text-2xl text-white' />
        <button className='font-semibold border border-gray-300 hover:bg-black hover:text-white w-32 h-10 bg-green-400 transition-all duration-300 rounded-md'>
          Logout
        </button>
      </div>
    </>
  );
};

export default Logout;
