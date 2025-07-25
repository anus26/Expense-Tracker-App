import React, { useState } from 'react'
import { useExpenses } from '../Context/Expenses'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';
import { getStyle } from '@coreui/utils'
import { Link } from 'react-router-dom';
import ExpenseForm from '../Components/ExpenseForm';
import { IoIosCloseCircleOutline } from "react-icons/io";
import ExpenseList from '../Components/ExpenseList';

ChartJS.register(BarElement, CategoryScale, LinearScale);



const Dashboard = () => {
  const {expenses}=useExpenses()
  const [showList,setShowList]=useState()
  const [showform,setShowForm]=useState()



  const handleFormToggle = () => {
  setShowForm(!showform);
  setShowList(false); // list ko hide karo
};

const handleListToggle = () => {
  setShowList(!showList);
  setShowForm(false); // form ko hide karo
};

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
    <div className='flex justify-end mr-20 m-5  '>

   <button onClick={handleFormToggle}  className="flex justify-end items-center  text-lg font-medium  w-32 transition-all  duration-300 text rounded-sm ">
 {showform ?<IoIosCloseCircleOutline className='rounded  text-3xl text-black'/>:'+ add expense'}
   </button>
    </div>
     <div className='flex justify-end mr-20 m-5 '>

       <button onClick={handleListToggle}  className="flex justify-end items-center  text-lg font-medium  w-32 transition-all  duration-300 text rounded-sm ">
     {showList ?<IoIosCloseCircleOutline className='rounded  text-3xl text-black'/>:'Expense List'}
       </button>
        </div>
    { showform  &&(
      <div className="flex justify-center mt-8">
          <ExpenseForm /> 
        </div>
    )}
      { showList  &&(
      <div className="flex justify-center mt-8">
          <ExpenseList /> 
        </div>
    )}

  
      { !showform && !showList && (<div className=' m-4 sm:m-6 xs:m-2  md:m-10 flex flex-wrap    gap-10 items-center justify-center border-2  shadow-xl     rounded-lg'>
 
  <div className='m-5 sm:m-3 xs:m-1'>


   <h2 className='text-xl font-bold mb-4  '>📅 Monthly Expenses</h2>
<div className=' md:w-96  sm:w-72 xs:w-60 !sm:h-96 h-96  '>
      <Bar data={monthlyChartData}     />
  </div>
  </div>
 
<div>

  <h2 className='text-xl font-bold mb-4'>📅 Daily Expenses</h2>
<div className='md:w-96 sm:w-72 xs:w-60 !sm:h-96 h-96 '>
      <Bar data={DailyChartData}  />
</div>
  </div>
</div>
   )
  }
  


    
    
    
  </div>


  </>
  ) 

}
export default Dashboard;