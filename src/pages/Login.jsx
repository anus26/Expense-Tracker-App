import React, {  useState } from 'react';
import { MdOutlineAttachEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUnlockAlt } from "react-icons/fa";
import AuthForm from '../Components/AuthForm';
const Login = () => {
  const [open ,setOpen]=useState(false)
  
  return    <AuthForm/>
 
};

export default Login;
