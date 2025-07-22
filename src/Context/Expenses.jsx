import { collection, deleteDoc, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
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

const updateExpense = async (id, updatedData) => {
  try {
    const expenseRef = doc(db, 'expense', id);
    await updateDoc(expenseRef, updatedData);
    console.log("✅ Expense updated");
  } catch (error) {
    console.error("❌ Error updating expense:", error.message);
  }
};


  


const deleteExpense=async(id)=>{
    try {
        const expenseRef=doc(db,'expense',id)
        await deleteDoc(expenseRef)
        console.log( 'Expens Delete');
        
    } catch (error) {
        console.error('error updating ',error.message);
        
    }
}
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
        <Expenses.Provider value={{expenses,updateExpense,deleteExpense}} >
                {children}
        </Expenses.Provider>
    )

}
export  const useExpenses=()=>useContext(Expenses)