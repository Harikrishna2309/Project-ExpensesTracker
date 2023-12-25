import React from 'react';
import { Link } from 'react-router-dom';
 
function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the Expenses Tracker</h1>
      <Link to="/expenses" className="link">View Expenses</Link>
      <Link to="/add-expense" className="link">Add Expense</Link>
    </div>
  );
}

export default Home;
