
const expense=require("../model/expense");


exports.insertExpenseInfo = async(req,res)=>{
    var check =await expense.selectExpense(req.body.title,req.body.time);

       if (check && check.rowCount===0){
       
           var query =await expense.insertExpense(req.body);
           console.log(query);
           var result = await expense.selectExpense(req.body.title,req.body.time);
           res.json({status: "TRUE", result: result});
       }
       else{
           res.json ({status: "FALSE", message:"Record already exist"});
           
       }
}

exports.selectAll = async(req,res)=>{
    var selectAll=await expense.expenseList(req.body.user_id);
    if(selectAll.rowCount===0){
        res.json({status: "FALSE", message:"No records to print"})
    }
    else{
        res.json({status:"TRUE",result:selectAll.rows});
    }
}