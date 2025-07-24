import { addDoc, collection, doc,  } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../firebase'
import toast from 'react-hot-toast'



const ExpenseForm = () => {
  const [subject,setSubject]=useState('')
  const [Merchant,setMerchant]=useState('')
  const [Date,setDate]=useState('')
  const [Total ,setTotal]=useState('')
  const [currency,setCurrency]=useState('')

  const handelDataadd=async(e)=>{
       e.preventDefault()
       try {
        await addDoc(collection(db ,'expense'),{
          subject,
          Merchant,
          Date,
          Total,
          currency,

        })
        toast.success('Successfully add')
          setSubject('');
      setMerchant('');
      setDate('');
      setTotal('');
      setCurrency('currency');
       } catch (error) {
        console.log(error.message);
        
       }



  }





  return (
  <>

 <div className="p-4 w-full flex justify-center">
  <div className="w-full max-w-xl bg-white shadow-md rounded-md p-6">
    <h1 className="font-semibold text-2xl text-center border-b pb-2 mb-6">
      New Expense
    </h1>

    <form onSubmit={handelDataadd} className="space-y-4">
      {/* Subject */}
      <div>
        <label className="block font-medium mb-1">Subject*</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full h-10 border bg-slate-300 rounded-md px-3 focus:ring-2 focus:ring-blue-200 focus:outline-none"
        />
      </div>

      {/* Merchant */}
      <div>
        <label className="block font-medium mb-1">Merchant*</label>
        <input
          type="text"
          value={Merchant}
          onChange={(e) => setMerchant(e.target.value)}
          className="w-full h-10 border bg-slate-300 rounded-md px-3 focus:ring-2 focus:ring-blue-200 focus:outline-none"
        />
      </div>

      {/* Date */}
      <div>
        <label className="block font-medium mb-1">Date*</label>
        <input
          type="date"
          value={Date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full h-10 border bg-slate-300 rounded-md px-3 focus:ring-2 focus:ring-blue-200 focus:outline-none"
        />
      </div>

      {/* Total and Currency */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <div className="flex-1">
          <label className="block font-medium mb-1">Total*</label>
          <input
            type="number"
            value={Total}
            onChange={(e) => setTotal(e.target.value)}
            className="w-full h-10 border bg-slate-300 rounded-md px-3 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />
        </div>

        <div className="flex-1 mt-4 sm:mt-0">
          <label className="block font-medium mb-1">Currency</label>
          <select
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full h-10 border bg-slate-300 rounded-md px-3 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          >
            <option value="USD">USD</option>
            <option value="RS">RS</option>
            <option value="UR">UR</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-2">
        <button
          type="submit"
          className="w-28 h-10 bg-green-500 text-white font-bold rounded-md hover:bg-black transition-all duration-300"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</div>

 
  </>
  )
}

export default ExpenseForm