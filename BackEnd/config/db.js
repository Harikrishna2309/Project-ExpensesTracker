const{dbConnect,Pool}=require('pg')
const db=new Pool({
    user:"postgres",
    host:"127.0.0.1",
    password:"Hari@23#9",
    port:5432,
    database:"Expense_manager"
});

module.exports=db;