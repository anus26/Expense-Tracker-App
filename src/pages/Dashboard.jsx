import React, { useState } from 'react'
import { useExpenses } from '../Context/Expenses'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';
import { getStyle } from '@coreui/utils'
import { Link } from 'react-router-dom';
import ExpenseForm from '../Components/ExpenseForm';
import { IoIosCloseCircleOutline } from "react-icons/io";
ChartJS.register(BarElement, CategoryScale, LinearScale);



const Dashboard = () => {
  const {expenses}=useExpenses()
  const [showform,setShowForm]=useState()
  //Monthly Aggregtion
  const monthlyData={}
  expenses.forEach((exp)=>{
    const month=moment(exp.Date).format('MMM YYYY')
    monthlyData[month]=(monthlyData[month] || 0)+Number(exp.Total)
  })



  const monthlyChartData={
    labels:Object.keys(monthlyData),
    datasets:[
      {
        label:'Monthly Expenses',
        data:Object.values(monthlyData),
        backgroundColor:['green','salt'],
       categoryPercentage: 0.4, // 👈 Space for each bar category (default is 0.8)
      barPercentage: 0.3 ,
          maxBarThickness: 40
      }
    ]
  }

  const DailyData={}
  expenses.forEach((exp)=>{
    const  day=moment(exp.Date).format('DD MMM')
    DailyData[day]=(DailyData[day] || 0)+Number(exp.Total)
  })
 const  DailyChartData={
  labels:Object.keys(DailyData),
  datasets:[
{    label:'Daily expenses',
     data:Object.values(DailyData),
     backgroundColor:['orange','blue'],
      categoryPercentage: 0.4, // 👈 Space for each bar category (default is 0.8)
      barPercentage: 0.3 ,
          maxBarThickness: 40
}

  ]
 }
  
  return (
  <>
  <div>
   <button onClick={()=>setShowForm(!showform)} >
 {showform ?<IoIosCloseCircleOutline />:'add expense'}
   </button>
    { showform ? (
         <div className="flex justify-center mt-8">
          <ExpenseForm />
        </div>):(
<div className=' m-24 flex  gap-10 items-center justify-center border border-r-gray-600 bg-green-200 rounded-lg border-none'>
 
  <div>


   <h2 className='text-xl font-bold mb-4  '>📅 Monthly Expenses</h2>

  <div className='w-96 h-96'>
      <Bar data={monthlyChartData}   />
  </div>
  </div>

<div>

  <h2 className='text-xl font-bold mb-4'>📅 Daily Expenses</h2>
  <div className='w-96 h-96'>
      <Bar data={DailyChartData}   />
</div>
  </div>
</div>
   )

    }
  </div>


  </>
  )
}

export default Dashboard