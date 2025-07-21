import React, { useState } from 'react';
import { useExpenses } from '../Context/Expenses';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Make sure this path is correct

const ExpenseList = () => {
  const { expenses } = useExpenses();
  const [editId, setEditId] = useState(null);
  const [subject, setSubject] = useState('');
  const [merchant, setMerchant] = useState('');
  const [date, setDate] = useState('');
  const [total, setTotal] = useState('');
  const [currency, setCurrency] = useState('');

  const handleEditClick = (item) => {
    setEditId(item.id);
    setSubject(item.subject || '');
    setMerchant(item.Merchant || '');
    setDate(item.Date || '');
    setTotal(item.Total || '');
    setCurrency(item.currency || '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editId) return;

    try {
      const docRef = doc(db, 'expense', editId);
      await updateDoc(docRef, {
        subject,
        Merchant: merchant,
        Date: date,
        Total: total,
        currency,
      });

      // Clear after update
      setEditId(null);
      setSubject('');
      setMerchant('');
      setDate('');
      setTotal('');
      setCurrency('');
    } catch (error) {
      console.error('Update error:', error.message);
    }
  };

  return (
    <div className='expenses-list'>
      <h1>Expenses List</h1>
      <table className='table-auto border w-full'>
        <thead>
          <tr className='bg-gray-200 text-left'>
            <th className='px-4 py-2'>Subject</th>
            <th className='px-4 py-2'>Merchant</th>
            <th className='px-4 py-2'>Date</th>
            <th className='px-4 py-2'>Total</th>
            <th className='px-4 py-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(expenses) && expenses.length > 0 ? (
            expenses.map((item) => (
              <React.Fragment key={item.id}>
                <tr className='border-t'>
                  <td className='px-4 py-2'>{item.subject}</td>
                  <td className='px-4 py-2'>{item.Merchant}</td>
                  <td className='px-4 py-2'>{item.Date}</td>
                  <td className='px-4 py-2'>{item.Total}</td>
                  <td className='px-4 py-2'>
                    <button
                      className='bg-blue-500 text-white px-2 py-1 rounded'
                      onClick={() => handleEditClick(item)}
                    >
                      Update
                    </button>
                  </td>
                </tr>

                {editId === item.id && (
                  <tr>
                    <td colSpan={5}>
                      <form onSubmit={handleSubmit} className='p-4 flex flex-col gap-2'>
                        <input type='text' placeholder='Subject' value={subject} onChange={(e) => setSubject(e.target.value)} />
                        <input type='text' placeholder='Merchant' value={merchant} onChange={(e) => setMerchant(e.target.value)} />
                        <input type='text' placeholder='Date' value={date} onChange={(e) => setDate(e.target.value)} />
                        <input type='text' placeholder='Total' value={total} onChange={(e) => setTotal(e.target.value)} />
                        <input type='text' placeholder='Currency' value={currency} onChange={(e) => setCurrency(e.target.value)} />
                        <button type='submit' className='bg-green-600 text-white px-3 py-1 rounded'>Submit</button>
                      </form>
                    </td>
                  </tr>
                )}
              </React.Fragment>
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
  );
};

export default ExpenseList;

