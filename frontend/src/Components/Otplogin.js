import React, { useState } from 'react';
import firebase from 'firebase/compat/app'; // Import the main Firebase App module
import 'firebase/compat/auth'; // Import the authentication module

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
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);

  const handleSendOTP = async () => {
    try {
      const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
      const phoneNumberWithCountryCode = `+91${phoneNumber}`; // Ensure correct country code

      const confirmation = await firebase
        .auth()
        .signInWithPhoneNumber(phoneNumberWithCountryCode, appVerifier);
        
      setConfirmationResult(confirmation);
      alert('OTP sent successfully!');
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
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Failed to verify OTP. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login with Phone Number and OTP</h2>
      <div id="recaptcha-container"></div>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Phone Number:
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
        <br />
        <button onClick={handleSendOTP}>Send OTP</button>
        <br />
        <label>
          OTP:
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
        </label>
        <br />
        <button onClick={handleVerifyOTP}>Verify OTP</button>
      </form>
    </div>
  );
};

export default PhoneOTPSignIn;
