import React, { useState } from 'react';
import{useNavigate} from 'react-router-dom';


const Login = () => {
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

  return (
  
  <div className='fullpage'>
    <div>
      <table>
        <tr>
          <td>
            expenses
          </td>
        </tr>
      </table>
    </div>
   <div className='login-container'>
     <div className='login'>
       <h2 style={{color:'white'}}>LOGIN</h2>
       <form onSubmit={handleSubmit}>
         <table className='login-table'>
           <tr>
             <td><label>USERNAME:</label></td>
             <td><input type="text"id="username" placeholder='username'value={username}onChange={handleUsernameChange}/></td>
           </tr>
           <tr>
             <td><label>PASSWORD:</label></td>
             <td><input type="password"id="password"placeholder='password'value={password}onChange={handlePasswordChange}/></td>
           </tr>
           <tr>
             <td colSpan={2}><button type="submit">Login</button></td>
           </tr>
         </table>
       </form>
     </div>
   </div>
   <div>
    <footer>
      <h3>visit@rtyui</h3>
    </footer>
   </div>
 </div>
  );
};

export default Login;
