import {Routes, Route} from 'react-router-dom';
import ExpenseList from './Components/ExpenseList';
import AddExpense from './Components/AddExpense';
//import Login from './Components/Login';
import Home from'./Components/Home';
import Login1 from './Components/Login1';

function App() {
  return (
    <div>
    <Routes>
      
          <Route path='/' element={<Login1/>}/>
          <Route path='/home'element={<Home/>}/>
          <Route path="/expenses" element={<ExpenseList/>} />
          <Route path="/add-expense" element={<AddExpense/>} />
       
      
    </Routes>
    </div>
  );
}

export default App;
