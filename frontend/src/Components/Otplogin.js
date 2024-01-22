import React, { useState } from 'react';
import firebase from 'firebase/compat/app'; // Import the main Firebase App module
import 'firebase/compat/auth'; // Import the authentication module
import './Otplogin.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { FaPhoneFlip } from "react-icons/fa6";


// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBiT4hlECuROPBH6yGNP5tJWl_XMSoIm8U",
    authDomain: "expenses-tracker-81fe9.firebaseapp.com",
    projectId: "expenses-tracker-81fe9",
    storageBucket: "expenses-tracker-81fe9.appspot.com",
    messagingSenderId: "771863973118",
    appId: "1:771863973118:web:cb76ac291fd72a62b2e9af",
    measurementId: "G-BCZ2PPL3Y4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const PhoneOTPSignIn = () => {
  const navigate=useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);

  const handleSendOTP = async () => {
    try {
      const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
      const phoneNumberWithCountryCode = `+91${phoneNumber}`;

      const confirmation = await firebase
        .auth()
        .signInWithPhoneNumber(phoneNumberWithCountryCode, appVerifier);
        
      setConfirmationResult(confirmation);
      alert('OTP sent successfully!');
      appVerifier.clear();
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        confirmationResult.verificationId,
        verificationCode
      );

      const userCredential = await firebase.auth().signInWithCredential(credential);
      const { user } = userCredential;

      // After successful verification, handle user login or navigate to the next screen
      console.log('User logged in:', user);
      alert('Logged in successfully!');
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
      console.error('Error verifying OTP:', error);
      alert('Failed to verify OTP. Please try again.');
    }
  };

  
  return (
    <div className="phone-auth-container">
      {/* <h2>Login with Phone Number and OTP</h2> */}
      <div id="recaptcha-container"></div>
      <form className="phone-auth-form" onSubmit={(e) => e.preventDefault()}>
      <div className="input-box">
          <input type="phone"placeholder="Enter your phone number"required value={phoneNumber}onChange={(e) => setPhoneNumber(e.target.value)}/>
          <FaPhoneFlip className="icon" />
        </div>
      
        <button onClick={handleSendOTP}>Send OTP</button>
        <div className="input-box">
          <input type="text"placeholder="Enter the OTP" value={verificationCode}onChange={(e) => setVerificationCode(e.target.value)}/>
        </div>
        <button onClick={handleVerifyOTP}>Verify OTP</button>
      </form>
    </div>
  );
};

export default PhoneOTPSignIn;
