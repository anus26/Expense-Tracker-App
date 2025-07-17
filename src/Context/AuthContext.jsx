import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged ,
   createUserWithEmailAndPassword,
 
   signInWithEmailAndPassword ,
    signOut
} from "firebase/auth";
import { auth } from "../firebase";



// 1 create context
const AuthContext =createContext()

// 2 create provider
export const AuthProvider=({children})=>{
  const [currentUser ,setCurrentUser]=useState(null)
  const [loading,setLoading]=useState(true)
  
  // listen for auth state changes
  useEffect(()=>{
  const unsubscribe=onAuthStateChanged(auth,user=>{
    setCurrentUser(user)
    setLoading(false)
  })
  return()=> unsubscribe()
},[])


// register
const register=(email,password)=>{
  return createUserWithEmailAndPassword(auth,email,password)
}

// login
const login=(email,password)=>{
  return signInWithEmailAndPassword(auth ,email,password)
}

// logout
const logout=()=>{
  return signOut(auth)
}


return (
  <AuthContext.Provider value={{currentUser,login ,register,logout}}>
{!loading && children}
  </AuthContext.Provider>
)
}

// 3 costum hook for consuming
export const useAuth=()=>{
  return useContext(AuthContext)
}
 