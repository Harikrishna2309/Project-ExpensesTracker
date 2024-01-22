import React, { useState, useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import './ExpensesList.css';

function ExpenseList() {
  const { userId ,userName} = useParams();
  

  const [expenseData, setExpenseData] = useState([]);
  const [totalExpenseAmount, setExpenseAmount] = useState(0);
  const [totalIncomeAmount, setIncomeAmount] = useState(0);

  useEffect(() => {
    fetchData(); // Fetch expense data when component mounts
  });

  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:7000/expense/expenselist', {
        user_id: userId
      });
      const sortedExpenseData = response.data.result.sort((a, b) => new Date(b.date) - new Date(a.date));

    setExpenseData(sortedExpenseData);

    const totalExpense = sortedExpenseData.reduce((total, expense) => {
      return expense.amount_type === 'expense' ? total + parseFloat(expense.amount) : total;
    }, 0);
    setExpenseAmount(totalExpense);

    const totalIncome = sortedExpenseData.reduce((total, income) => {
      return income.amount_type === 'income' ? total + parseFloat(income.amount) : total;
    }, 0);
    setIncomeAmount(totalIncome);

  } catch (error) {
    console.error('Error fetching expenses:', error);
  }
  };

  const pieChartData = [
    { name: 'Income', amount: totalIncomeAmount },
    { name: 'Expense', amount: totalExpenseAmount }
  ];

  const colors = ['#82ca9d', '#f04a4a'];
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    return formattedDate;
  };

  return (
    <div className='list_full'>
      <header className="header">
      <h2>Expense Summary of {userName}</h2>
       </header>
    <div className="expense-container">
      <div className="header-actions">
      <Link to={`/add-expense/${userId}/${userName}`} className="link">Add Expense</Link>
      </div>
      <div className="pie-chart">
        <PieChart width={500} height={250}>
          <Pie data={pieChartData} dataKey="amount" outerRadius={80} label={({ name, value }) => `${name}: ${value}`}>
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </div>

      <div className="expense-table">
        <h2>Expense Details</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Time</th>
              <th>Amount Type</th>
            </tr>
          </thead>
          <tbody>
            {expenseData.map((expense, index) => (
              <tr key={index}>
                <td>{expense.title}</td>
                <td>{expense.description}</td>
                <td>{expense.amount}</td>
                <td>{formatDate(expense.date)}</td> {/* Adjust the date format */}
                <td>{expense.time}</td>
                <td>{expense.amount_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <footer className="footer">
          <div>
            <p>© 2024 Expenses Tracker</p>
            <p>All rights reserved</p>
          </div>
          <div className="social-icons">
            <a href="#facebook">Facebook</a>
            <a href="#twitter">Twitter</a>
            <a href="#instagram">Instagram</a>
          </div>
      </footer>
    </div>
  );
}

export default ExpenseList;
