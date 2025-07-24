import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import {  Children, createContext, useContext, useDebugValue, useEffect, useState } from "react";
import { db } from "../firebase";
import { FiFilter } from "react-icons/fi";
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


    


const filterExpensesBySubject = async (subject) => {

  try {
    const q = query(collection(db, 'expense'), where('subject', '==', subject));
    const snapshot = await getDocs(q);
    const filtered = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setExpenses(filtered)
    console.log("✅ Filtered Data:",filtered);
    
   return filtered; 
  
  } catch (error) {
    console.error("❌ Error fetching filtered expenses:", error.message);
return[]
  }
};


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

      
    


    return(
        <Expenses.Provider value={{expenses,updateExpense,deleteExpense,filterExpensesBySubject}} >
                {children}
        </Expenses.Provider>
    )

}
export  const useExpenses=()=>useContext(Expenses)