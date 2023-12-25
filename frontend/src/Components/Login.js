import React,{useState} from "react";
import{useNavigate,Link} from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import "../Components/Login.css"

const Login=()=>{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    navigate('/Home')
  };
  return(
    <div className="loginform">
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input type="text"placeholder="username"required value={username}onChange={handleUsernameChange}/>
          <FaUser className="icon" />
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
    </div>
    </div>
  )
}
export default Login;