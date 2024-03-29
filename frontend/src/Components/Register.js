import React, { useState,} from "react";
import { useNavigate } from "react-router-dom";
import "../Components/Register.css";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
import { MdVerified } from "react-icons/md";
import { FaSquarePhone } from "react-icons/fa6";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import axios from 'axios';


const firebaseConfig = {
  apiKey: "AIzaSyBiT4hlECuROPBH6yGNP5tJWl_XMSoIm8U",
  authDomain: "expenses-tracker-81fe9.firebaseapp.com",
  projectId: "expenses-tracker-81fe9",
  storageBucket: "expenses-tracker-81fe9.appspot.com",
  messagingSenderId: "771863973118",
  appId: "1:771863973118:web:cb76ac291fd72a62b2e9af",
  measurementId: "G-BCZ2PPL3Y4"
};

firebase.initializeApp(firebaseConfig);


function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [confirmationResult, setConfirmationResult] = useState(null);

  const sendOTP = async () => {
    try {
      const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
      const phoneNumberWithCountryCode = `+91${phoneNumber}`;

      const confirmation = await firebase
        .auth()
        .signInWithPhoneNumber(phoneNumberWithCountryCode, appVerifier);
        
      setConfirmationResult(confirmation);
      console.log(phoneNumberWithCountryCode);
      console.log(confirmationResult)
      alert('OTP sent successfully!');
    } 
     catch (error) {
      console.error('Error sending OTP:', error.code, error.message);
      alert('Failed to send OTP. Please try again.');
    }
  };
  
  

  const registerUser = async () => {
      
      const response = await axios.post('http://localhost:7000/users/postuser', 
      {name:username,
       phone:phoneNumber});
      console.log(response);
      alert('Account created successfully!');
      navigate('/Home');
    
  };
  
  

  
    return(
    <div className="registration-form">
      <div className="wrapper">
        <form >
          <h1>Register</h1>
          <div className="input-box">
            <input type="text"placeholder="username"required value={username} onChange={(e) => setUsername(e.target.value)} />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input type="tel"placeholder="PhoneNumber"required pattern="[0-9]*" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
            <FaSquarePhone className="icon"/>
          </div>
          <button type="submit"className="otp-btn"onClick={sendOTP}>send OTP</button>
          <div className="input-box">
            <input type="text"placeholder="Enter 6-digit code" value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}/>
            <MdVerified className="icon"/>
          </div>
          <div className="input-box">
            <input type="password"placeholder="password" value={password}
              onChange={(e) => setPassword(e.target.value)}/>
            <RiLockPasswordFill className="icon" />
          </div>
          <div className="input-box">
            <input type="password"placeholder="confirm password" value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} />
            <RiLockPasswordLine className="icon" />
          </div>
          <button type="submit"className="register-btn" onClick={registerUser}>Register</button>
        </form>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  )
}
export default Register;
