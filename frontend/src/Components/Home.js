import React from 'react';
import { useLocation,Link } from 'react-router-dom';
import "../Components/Home.css"
//import Footer from './Footer';

function Home() {
  const location = useLocation();
  console.log(location);
  const userData = location.state?.userData;
  console.log(userData)
  const userInfo = userData?.result[0];

  return (
    <div>
       <header className="header">
        <h1>Expenses Tracker</h1>
      </header>
    <div className="home-container">
      {userData && (
        <div>
          <h2>WELCOME :{userInfo.name}</h2>
          {/* <p>Name: {userInfo.name}</p> */}
          <p>Phone: {userInfo.phone}</p>
          <p>id:{userInfo.id}</p>
          {/* Display other user data properties as needed */}

          <Link to={`/expenses/${userInfo.id}`}className="link">View Expenses</Link>
          {/* <button className='link'>Add Expense</button> */}
          <Link to={`/add-expense/${userInfo.id}`} className="link">Add Expense</Link>
        </div>
      )}
      
    </div>
    <footer className="footer">
        <div className="footer-content">
          <div>
            <p>© 2024 Expenses Tracker</p>
            <p>All rights reserved</p>
          </div>
          <div className="social-icons">
            <a href="#facebook">Facebook</a>
            <a href="#twitter">Twitter</a>
            <a href="#instagram">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
