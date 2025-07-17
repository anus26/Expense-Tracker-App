import React, {  useState } from 'react';
import { MdOutlineAttachEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUnlockAlt } from "react-icons/fa";
import AuthForm from '../Components/AuthForm';
const Login = () => {
  const [open ,setOpen]=useState(false)
  
  return    <AuthForm/>
    // <section className="flex justify-center items-center min-h-screen">
    //   <div className="border-4 border-gray-300 bg-white p-10 rounded-lg shadow-lg">
    //     <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
    //       <h2>
    //         {isRegister ? 'register':'login'}
    //       </h2>
    //       <div className="relative">
    //         <input
    //           type="email"
    //           placeholder="Email"
    //           className="w-full h-10 px-10 border-2 border-gray-300 rounded-md"
    //         />
    //         <MdOutlineAttachEmail className="absolute top-2.5 left-3 text-gray-500 text-xl" />
    //       </div>
    //         <div className='relative'>

    //      <input
    //           type={open ? 'text' : 'password'}
    //           placeholder="Password"
    //           className="w-full h-10 px-10 border-2 border-gray-300 rounded-md"
    //         />
    //     {open ? (
    //           <RiLockPasswordFill
    //             onClick={() => setOpen(!open)}
    //             className="absolute top-2.5 right-3 text-gray-500 text-xl cursor-pointer"
    //           />
    //         ) : (
    //           <FaUnlockAlt
    //             onClick={() => setOpen(!open)}
    //             className="absolute top-2.5 right-3 text-gray-500 text-xl cursor-pointer"
    //           />
    //         )}
    //         </div>
    //       <button
    //         type="submit"
    //         className="font-semibold border border-gray-300 hover:bg-black hover:text-white w-32 h-10 bg-green-400 transition-all duration-300 rounded-md"
    //       >
    //         Login
    //       </button>
    //     </form>

  
    //   </div>
    // </section>
};

export default Login;
