const db=require("../../config/db");

exports.selectExpense=async(title,time)=>{
    return await db.query("select id,title,amount,time from expenses where title='"+title+"'AND time='"+time+"'");
}

exports.insertExpense=async(req)=>{
    let keys=Object.keys(req);
    let ourcolums=["title","user_id","description","amount","amount_type","date","time"];
    let insertkeys="";
    let insertvalues="";

        keys.forEach((key,i)=>{ 
            if(ourcolums.includes(key)){
                insertvalues=insertvalues+"'"+req[key]+"',";
                insertkeys=insertkeys+""+key+","
            }
        });
         return await db.query("insert into expenses ("+insertkeys.substring(0,insertkeys.length-1)+") values ("+insertvalues.substring(0,insertvalues.length-1)+")");

}

exports.expenseList=async()=>{
    return await db.query("select * from expenses")
}
