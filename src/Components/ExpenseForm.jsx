import { doc, setDoc } from 'firebase/firestore'
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
        await setDoc(doc(db ,'expense','tracker'),{
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
      setCurrency('USD');
       } catch (error) {
        console.log(error.messages);
        
       }



  }





  return (
  <>

    <div className='expense form '>
 <h1 className='font-semibold text-3xl border-b-2 m-2 flex items-center justify-center'>New Expense</h1>
<form  onSubmit={handelDataadd} className='flex flex-col '>
  <div  className='flex items-center justify-center m-3 gap-6 ' >

<label className="block font-medium mb-1 ">
  Subject*   
</label>
  <input type="text" value={subject} onChange={(e)=>setSubject(e.target.value)} className='w-96 h-9 border-2 bg-slate-300  rounded-md focus:ring-2 focus:ring-blue-200 focus:outline-none ' />
  </div>
  <div className='flex items-center justify-center m-3 gap-3'>

<label  className="block font-medium mb-1 text-right">
  Merchant*  
</label>
  <input type="text" value={Merchant} onChange={(e)=>setMerchant(e.target.value)} className='w-96 h-9 border-2 bg-slate-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:outline-none' />
  </div>
  <div className='flex items-center justify-center m-3 gap-12'>

<label  className='block font-medium mb-1' >
  Date*    
</label>
   <input type="text" value={Date} onChange={(e)=>setDate(e.target.value)}  className='w-96 h-9 border-2 bg-slate-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:outline-none' />
  </div>
  <div  className='flex items-center justify-center m-3 gap-16'>

<label  className='block font-medium mb-1 '>
  Total*    
</label>
  <input type="text" value={Total} onChange={(e)=>setTotal(e.target.value)} className='w-56 h-9 border-2 bg-slate-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:outline-none' />
  <div className=''>

<select onChange={(e)=>setCurrency(e.target.value)} className='w-24 rounded-md  border-2 h-9 bg-slate-300 focus:ring-2 focus:ring-blue-200 focus:outline-none'  >
  <option value="USD">USD</option>
  <option value="RS">RS</option> 
  <option value="UR">UR</option>
</select>
  </div>
  </div>

<div className='flex justify-center  m-3'>

<button type='submit' className='font-bold text-xl border  w-24 h-10 transition-all duration-500 rounded-md  bg-green-400 hover:bg-black hover:text-white'>Save</button>
</div>
</form>


    </div>
 
  </>
  )
}

export default ExpenseForm