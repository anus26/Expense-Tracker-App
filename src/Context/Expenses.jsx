import { collection, onSnapshot } from "firebase/firestore";
import {  Children, createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";

const  Expenses=createContext()

export const ExpenseProvider=({children})=>{
    const [expenses,setExpenses]=useState([])
    useEffect(()=>{
        const unsubscribe=onSnapshot(collection(db,'expense'),(snapshot)=>{
            const expenseData=snapshot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data(),
            }))
            setExpenses(expenseData)
        })
        return ()=>unsubscribe()  //cleanup
    },[])
    return(
        <Expenses.Provider value={{expenses}}>
                {children}
        </Expenses.Provider>
    )

}
export  const useExpenses=()=>useContext(Expenses)