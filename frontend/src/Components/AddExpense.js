// AddExpense.js
import React, { useState,useEffect} from 'react';
import './AddExpense.css'; 
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddExpense = () => {
  const { userId } = useParams();
  console.log("id= "+userId)
  const [options, setOptions]=useState([])
  const [transactionType, setTransactionType] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate]=useState('');
  const [time,setTime]=useState('')
  const [description,setDesription]=useState('')


    
    const fetchData = async () => {
      console.log(userId)
        const response = await axios.post('http://localhost:7000/tag/gettag',{ 
            user_id:userId
        });
        const data = response.data.result;
        console.log(data);
        //options=data;
        setOptions(data);
        console.log(options);
      }

      useEffect(() => {
        // Set default date to today
        const today = new Date();
        const formattedDate = today.toISOString().substr(0, 10); // Format as YYYY-MM-DD
        setDate(formattedDate);
    
        // Set default time to current time
        const formattedTime = today.toTimeString().split(' ')[0]; // Extract HH:MM:SS
        setTime(formattedTime);
      }, []);

const handleCategoryChange = async (e) => {
  const selectedCategory = e.target.value;
  if (selectedCategory === "add") {
    const newCategory = prompt("Enter a new category:");
    if (newCategory) {
      try {
        // Assuming you have an API endpoint to add categories
        await axios.post('http://localhost:7000/tag/posttag', {
          user_id: userId,
          name: newCategory,
        });
        const updatedOptions = [...options, { name: newCategory }];
        setOptions(updatedOptions);
        setCategory(newCategory);
      } catch (error) {
        console.error('Error adding category:', error.message);
      }
    }
  } else {
    setCategory(selectedCategory);
  }
};

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
          <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)} >
            <option value="">Select Transaction Type</option> 
            <option value="expense">Expense</option>
            <option value="income">Income</option>
            
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
      <select value={category} onChange={handleCategoryChange} onClick={fetchData}>
        <option value="">Select a category</option>
         {options.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))} 
        <option value="add">Add</option>
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

