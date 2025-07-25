import React, { useState } from 'react'
import { MdOutlineAttachEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUnlockAlt } from "react-icons/fa";

import { useNavigate } from 'react-router-dom';

import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,signInWithEmailAndPassword } from 'firebase/auth';
import { auth, provider } from '../firebase';
import toast from 'react-hot-toast';
const AuthForm = () => {
   const [open ,setOpen]=useState(false)
   const [isRegister,setIsRegister]=useState(false)
   const [email,setEmail]=useState('')
   const [password,setPassword]=useState('')
   const [error,setError]=useState('')
    const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
setError('')
  try {
    if (isRegister) {
      const userCredential=await createUserWithEmailAndPassword(auth,email,password)

      toast.success('Registerd successfully')
      console.log(userCredential.user);
      
    }else{
      const userCredential =await signInWithEmailAndPassword(auth,email,password)
      toast.success('login successfully')
      console.log(userCredential.user);
      
    }

    navigate('/dashboard'); 
  } catch (error) {
    setError(error.message)
    toast.error('error corrected type')
  }
  
};

const handleGoogle=async()=>{
    try {
      const result = await signInWithPopup(auth, provider);
      toast.success("Logged in with Google");
      console.log(result.user);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Google sign-in failed");
      console.error(error);
    }
  }

  return (
  <>
  <section className="flex justify-center items-center min-h-screen">
      <div className="border-4 border-gray-300 bg-white p-10 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
          <h2 className='font-semibold text-3xl'>{isRegister ? 'Register':'Login'}
          </h2>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="relative w-full">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full h-10 px-10 border-2 border-gray-300 rounded-md"
              required
            />
            <MdOutlineAttachEmail className="absolute top-2.5 left-3 text-gray-500 text-xl" />
          </div>
            <div className='relative w-full'>

         <input
              type={open ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full h-10 px-10 border-2 border-gray-300 rounded-md"
              required
            />
        {open ? (
              <RiLockPasswordFill
                onClick={() => setOpen(!open)}
                className="absolute top-2.5 right-3 text-gray-500 text-xl cursor-pointer"
              />
            ) : (
              <FaUnlockAlt
                onClick={() => setOpen(!open)}
                className="absolute top-2.5 right-3 text-gray-500 text-xl cursor-pointer"
              />
            )}
            </div>
          <button
            type="submit"
            className="font-semibold border border-gray-300 hover:bg-black hover:text-white w-32 h-10 bg-green-400 transition-all duration-300 rounded-md"
          >
            {isRegister ?'Register':'Login'}
           
          </button>
         <button type='submit' onClick={handleGoogle} className='bg-white border shadow-xl flex items-center justify-between p-4 w-52 hover:bg-yellow-400 h-14 font-semibold text-center'>
          <img src="./images/google.png" alt="goolge" className='w-5' />{isRegister ? 'Sigin with Goolge': 'Login with Google'}

         </button>
          <p>
            {isRegister ?'Already have an account ?':'Do  not have any accoutn ?'}{''}
            <span 
            onClick={()=>setIsRegister(!isRegister)}
                 className="text-blue-500 cursor-pointer underline"
            >
   {isRegister ? "Login" : "Register"}
            </span>
            
          </p>
        </form>
      </div>
    </section>
  
  </>
  )
}

export default AuthForm