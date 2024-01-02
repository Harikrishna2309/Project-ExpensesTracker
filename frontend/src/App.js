import { Route, Routes } from 'react-router-dom';
import ExpenseList from './Components/ExpenseList';
import AddExpense from './Components/AddExpense';
//import Login from './Components/Login';
import Home from'./Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
//import PhoneOTPSignIn from './Components/Otplogin';

function App() {
  return (
    <div>
      <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/Register'element={<Register/>}/>
          <Route path='/home'element={<Home/>}/>
          <Route path="/expenses" element={<ExpenseList/>} />
          <Route path="/add-expense/:userId" element={<AddExpense/>} />
      </Routes>
      
      </div>
  );
}

export default App;
