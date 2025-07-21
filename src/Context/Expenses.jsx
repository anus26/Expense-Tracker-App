import { collection, getDoc, onSnapshot } from "firebase/firestore";
import {  Children, createContext, useContext, useDebugValue, useEffect, useState } from "react";
import { db } from "../firebase";

const  Expenses=createContext()

export const ExpenseProvider=({children})=>{
    const [expenses,setExpenses]=useState([])
    const [updated,setUpDated]=useState([])
    
    // const [getexpense,setGetExpense]=useState([])
    useEffect(()=>{
        const unsubscribe=onSnapshot(collection(db,'expense'),(snapshot)=>{
            const expenseData=snapshot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data(),
            }))
            console.log('🔥 Expense data:', expenseData);
            setExpenses(expenseData)
        })
        return ()=>unsubscribe()  //cleanup

      
    },[])

        useEffect(()=>{
        const unsubscribe=onSnapshot(collection(db,'update'),(snapshot)=>{
            const expenseData=snapshot.docChanges().forEach((doc)=>({
                id:doc.id,
                ...doc.data(),
            }))
        setUpDated(expenseData)
        })
        return ()=>unsubscribe()  //cleanup
      
    },[])
//    useEffect(()=>{
//     const unsubscribe=onSnapshot(collection(db,'getexpense'),(snapshot)=>{
//         const expense=snapshot.docs.map(doc=>({
//           id:doc.id,
//           ...doc.data(),
//         }))

//         setGetExpense(expense)
//     })
//   return ()=>  unsubscribe()
//    },[])
      
    


    return(
        <Expenses.Provider value={{expenses,updated}} >
                {children}
        </Expenses.Provider>
    )

}
export  const useExpenses=()=>useContext(Expenses)