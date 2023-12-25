import React from "react";
import { useNavigate } from "react-router-dom";
import "../Components/Register.css";
import { FaUser} from "react-icons/fa";
import { RiLockPasswordFill,RiLockPasswordLine } from "react-icons/ri";
import { MdVerified } from "react-icons/md";
import { FaSquarePhone } from "react-icons/fa6";

function Register(){
  const navigate=useNavigate();

  const handleSubmit = (event) =>{
    navigate("/Home")
  }
    return(
    <div className="registration-form">
      <div className="register-container">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className="input-box">
            <input type="text"placeholder="username"required />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input type="tel"placeholder="Phone Number"required pattern="[0-9]*"/>
            <FaSquarePhone className="icon"/>
          </div>
          <div className="input-box">
            <input type="text"placeholder="Enter 6-digit code"/>
            <MdVerified className="icon"/>
          </div>
          <div className="input-box">
            <input type="password"placeholder="password"required />
            <RiLockPasswordFill className="icon" />
          </div>
          <div className="input-box">
            <input type="password"placeholder="confirm password"required />
            <RiLockPasswordLine className="icon" />
          </div>
          <button type="submit"className="submit-btn">Register</button>
        </form>
      </div>
    </div>
  )
}
export default Register;