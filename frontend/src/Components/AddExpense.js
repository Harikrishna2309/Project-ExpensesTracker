// AddExpense.js
import React, { useState,useEffect} from 'react';
import './AddExpense.css'; 
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddExpense = () => {
  const { userId } = useParams();
  console.log("id= "+userId)
  const [options, setOptions]=useState([])
 // const options=''
  const [transactionType, setTransactionType] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate]=useState('');
  const [time,setTime]=useState('')
  const [description,setDesription]=useState('')

  useEffect(() => {
    
    const fetchData = async () => {
      console.log(userId)
      try{
        const response = await axios.post('http://localhost:7000/tag/gettag',{ 
            user_id:userId
        });
        const data = response.data.result;
        console.log(data);
        //options=data;
        setOptions(data);
        console.log(options);
    
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
};
fetchData();
}, [userId,options]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:7000/expense/postexpense',{
        title:title,
        amount:amount,
        amount_type:transactionType,
        description:description,
        date:date,
        time:time,
        user_id:userId
      });

      alert("trancation added successfully")
  
    console.log(response);
    // Clear form fields after submission
    setTitle('');
    setAmount('');
    setCategory('');
    setDate('');
    setTime('');
    setDesription('')
    setTransactionType('')
  };

  return (
    <div className="add-expense-container">
      <h2 style={{textAlign:'center'}}>New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Transaction Type</label>
          <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)} required>
            <option value="">Select Transaction Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="form-group">
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required/>
        </div>
        <div className="form-group">
          <label>Amount</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required/>
        </div>
        <div className="form-group">
      <label>Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select a category</option>
         {options.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))} 
      </select>
    </div>
        <div className='form-group'>
          <label>Date</label>
          <input type='Date'value={date}onChange={(e)=>setDate(e.target.value)}/>
        </div>
        <div className='form-group'>
          <label>Time</label>
          <input type='Time' value={time}onChange={(e)=>setTime(e.target.value)}/>
        </div>
        <div className='form-group'>
          <label>Description</label>
          <input type='text' value={description}onChange={(e)=>setDesription(e.target.value)}/>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddExpense;

