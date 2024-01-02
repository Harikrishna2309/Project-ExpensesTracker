import React,{useEffect, useState} from "react";
import{useNavigate,Link} from 'react-router-dom';
import { FaPhoneFlip } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import "../Components/Login.css"
import axios from 'axios';
//import Home from "./Home";


const Login=()=>{
  const [userData, setUserData] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();


  useEffect(() => {
    console.log(userData);
}, [userData]);


  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:7000/users/getinfo',{
        phone:phoneNumber
      });
      //console.log(response.data.result[0].name);
      // setUserData(response.data);
      // console.log(userData);
      const userData=response.data;
      console.log(userData)
      navigate('/Home', { state: { userData } });
    } catch (error) {
      console.error('Error fetching user info:', error.message); // Log the specific error message
      console.error('Error details:', error); // Log the entire error object for more details
      // Handle error condition
    }
  };
  return(
    <div className="loginform">
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input type="phone"placeholder="Enter your phone number"required value={phoneNumber}onChange={handlePhoneChange}/>
          <FaPhoneFlip className="icon" />
        </div>
        <div className="input-box">
          <input type="password"placeholder="password"required value={password}onChange={handlePasswordChange}/>
          <FaLock className="icon" />
        </div>
        <div className="remember-forgot">
          <label><input type="checkbox"/>Remember me</label>
          <a href="#">Forgot password</a>
        </div>
        <button type="submit">Login</button>
        <div className="register-link">
          <p>Don't have  an account?<Link to="/Register">Register</Link></p>
        </div>
      </form>
      {/* {userData && <Home userData={userData} />} */}
    </div>
    </div>
  )
}
export default Login;