import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

function ExpenseList() {
  const { userId } = useParams();
  console.log("id= "+userId)

  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    fetchData(); // Fetch expense data when component mounts
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:7000/expense/expenselist', { 
  params: { user_id: userId }
});
      setExpenseData(response.data);
      console.log(expenseData); 
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const getChartData = () => {
    // Process 'expenseData' to create chart data (e.g., labels and data values)
    // Example data structure: { labels: ['Category 1', 'Category 2'], datasets: [{ data: [value1, value2] }] }
    // Create chart data from fetched expenseData
    // ...

    return {
      labels: ['Category 1', 'Category 2'], // Example labels
      datasets: [
        {
          data: [50, 30], // Example data values
          backgroundColor: ['#FF6384', '#36A2EB'], // Example colors
        },
      ],
    };
  };

  return (
    <div className="list">
      <h2>Expense List of {userId}</h2>
      {/* Display expenses */}
      <div>
      <h2>Expense Chart</h2>
      <div className="pie-chart">
        {/* <Pie data={getChartData()} /> */}
      </div>
    </div>
    </div>
  );
}

export default ExpenseList;
