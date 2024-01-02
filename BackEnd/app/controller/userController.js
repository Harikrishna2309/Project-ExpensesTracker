const db=require("../../config/db");
const users=require("../model/user");


//insert user
exports.insertUserInfo = async(req,res)=>{
     var check =await users.selectUser(req.body.phone);

        if (check && check.rowCount===0){
        
            var query =await users.insertUser(req.body);
            console.log(query);
            // var result = await users.selectUser(req.body.phone);
            res.json({status: "TRUE", result: query});
        }
        else{
            res.json ({status: "FALSE", message:"Record already exist"});
            //console.log("already present")
        }
}
//update user
exports.updateUser=async(req,res)=>{
    var check=await users.selectUser(req.body.phone);

    if(check && check.rowCount===0){
        res.json({status:"FALSE",message:"user not present"});
    }
    else{
        var query= await users.updateUser(req.body);
        console.log(query);
        var result= await users.selectUser(req.body.phone);
        res.json({status:"updated",result:result.rows})
    }
    
}

//to get user list
exports.selectAll = async(req,res)=>{
    var selectAll=await users.userList(req.body.phone);
   console.log(selectAll);

    if(selectAll.rowCount===0){
        res.json({status: "FALSE", message:"No records to print"})
    }
    else{
        res.json({status:"TRUE",result:selectAll.rows});
    }
}
exports.jointData=async(req,res)=>{
    var jointdata=await users.jointData(req.body.phone);
    console.log(jointdata);

    if(jointdata.rowCount===0){
        res.json({status: "FALSE", message:"No records to print"})
    }
    else{
        res.json({status:"TRUE",result:jointdata.rows});
    }
}