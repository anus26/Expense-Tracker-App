import React, { useState, useRef } from 'react'
import { useExpenses } from '../Context/Expenses'
import { FiFilter } from "react-icons/fi";
import { MdOutlineSystemSecurityUpdate } from "react-icons/md";
import { FaDeleteLeft } from "react-icons/fa6";

const ExpenseList = () => {
  const { expenses, setExpenses,updateExpense, deleteExpense,filterExpensesBySubject} = useExpenses();

  const [subject, setSubject] = useState('');
  const [Merchant, setMerchant] = useState('');
  const [Date, setDate] = useState('');
  const [Total, setTotal] = useState('');
  const [currency, setCurrency] = useState('');
  const [openId, setOpenId] = useState(null);
  const [openFilter,setOpenFilter]=useState('')
  const [filter,setFilter]=useState('')
  const [isSubjectChecked, setIsSubjectChecked] = useState(false);

  const modalRef = useRef();

  const handleEditClick = (item) => {
    setSubject(item.subject);
    setMerchant(item.Merchant);
    setDate(item.Date);
    setTotal(item.Total);
    setCurrency(item.currency);
    setOpenId(item.id);
    modalRef.current.showModal(); // Show the modal
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateExpense(openId, {
        subject,
        Merchant,
        Date,
        Total,
        currency,
      });

      // Reset state
      setSubject('');
      setMerchant('');
      setDate('');
      setTotal('');
      setCurrency('');
      setOpenId(null);
      modalRef.current.close(); // Close modal after save
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await deleteExpense(id);
    } catch (error) {
      console.log(error.message);
    }
  };
const handlefilter = async (e) => {
  e.preventDefault();


    const  filtered= await filterExpensesBySubject(subject);
    console.log('filtered', filtered);
   
  
  

setIsSubjectChecked(false)
setSubject('')
};

  

  return (
    <>
      <div className='expenses list'>
        <h1 className="text-2xl font-bold mb-4 sm:text-center xs:text-center">Expenses List</h1>
<div className='filter relative flex items-end justify-end font-semibold text-2xl m-2 scroll-m-3   '>
  <button className='hover:bg-slate-100 rounded-full drop-shadow-xl p-2 shadow-md  scroll-smooth '>
        <FiFilter onClick={()=>setOpenFilter(!openFilter)}   />

  </button>
 { openFilter && ( 
<form onSubmit={handlefilter} className='absolute z-10 flex flex-col top-16 right-0 border-2 rounded-md shadow-lg space-y-4 w-48 bg-white gap-2'>
  
  <label className='flex items-center gap-2 text-sm m-2'>
    <input 
      type="checkbox" 
      checked={isSubjectChecked}
      onChange={() => setIsSubjectChecked(!isSubjectChecked)}
    />
    Enable Subject Filter
  </label>

  <label className='flex flex-col text-sm m-2'>
    Subject:
    <input 
      type="text" 
      placeholder="Enter subject"
      value={subject}
      onChange={(e) => setSubject(e.target.value)}
      className="input input-bordered"
    />
  </label>

  <button type="submit" className="btn btn-sm btn-primary w-full mt-2">Filter</button>
</form>

)}


</div>
<div className='overflow-x-auto sm:snap-x sm:snap-mandatory'>

        <table className='table-auto  border-collapse table-zebra w-full  sm:w-20 xs:w-10 '>
          
          <thead>
            <tr className='bg-gray-200 text-left flex-row-1'>
              <th className='px-4 py-2'>Subject</th>
              <th className='px-4 py-2'>Merchant</th>
              <th className='px-4 py-2'>Date</th>
              <th className='px-4 py-2'>Total</th>
              <th className='px-4 py-2'>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(expenses) && expenses.length > 0 ? (
              expenses.map((item) => (
                <tr key={item.id} className='border-t sm:snap-start  '>
                  <td className='px-4 py-2 '>{item.subject}</td>
                  <td className='px-4 py-2 '>{item.Merchant}</td>
                  <td className='px-4 py-2  '>{item.Date}</td>
                  <td className='px-4 py-2 '>{item.Total}</td>
                  <td className='px-4 py-2 flex gap-2'>
                    <button className="btn btn-sm btn-info sm:hidden md:block xs:hidden" onClick={() => handleEditClick(item)}>
                      Update
                    </button>
                      < MdOutlineSystemSecurityUpdate onClick={() => handleEditClick(item)} className='md:hidden text-blue-500'/>
                    <button className="btn btn-sm btn-error sm:hidden md:block xs:hidden" onClick={() => handleDeleteClick(item.id)}>
                      Delete
                    </button>
                    <FaDeleteLeft  onClick={() => handleDeleteClick(item.id)} className='md:hidden text-red-500'/>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className='text-center py-4'>
                  No expense data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* DaisyUI Modal */}
      <dialog id="edit_modal" className="modal" ref={modalRef}>
        <div className="modal-box">
          <form onSubmit={handleSubmit} method="dialog" className="space-y-3">
            <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => modalRef.current.close()}>
              ✕
            </button>

            <h3 className="font-bold text-lg">Edit Expense</h3>
            <input type="text" placeholder="Subject" className="input input-bordered w-full"
              value={subject} onChange={(e) => setSubject(e.target.value)} />
            <input type="text" placeholder="Merchant" className="input input-bordered w-full"
              value={Merchant} onChange={(e) => setMerchant(e.target.value)} />
            <input type="text" placeholder="Date" className="input input-bordered w-full"
              value={Date} onChange={(e) => setDate(e.target.value)} />
            <input type="text" placeholder="Total" className="input input-bordered w-full"
              value={Total} onChange={(e) => setTotal(e.target.value)} />
            <input type="text" placeholder="Currency" className="input input-bordered w-full"
              value={currency} onChange={(e) => setCurrency(e.target.value)} />
            <button type="submit" className="btn btn-primary w-full">Save Changes</button>
          </form>
        </div>
      </dialog>
              </div>
    </>
  );
};

export default ExpenseList;


