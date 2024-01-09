import { Route, Routes } from 'react-router-dom';
import ExpenseList from './Components/ExpenseList';
import AddExpense from './Components/AddExpense';
import Home from'./Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Otplogin from './Components/Otplogin';

function App() {
  return (
    <div>
      <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/Register'element={<Register/>}/>
          <Route path='/Otplogin'element={<Otplogin/>}/>
          <Route path='/home'element={<Home/>}/>
          <Route path="/expenses/:userId" element={<ExpenseList/>} />
          <Route path="/add-expense/:userId" element={<AddExpense/>} />
      </Routes>
      
      </div>
  );
}

export default App;
