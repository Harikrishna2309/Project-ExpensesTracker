const db=require("../../config/db");
const tags=require("../model/tag");

exports.insertTags = async(req,res)=>{
    var check =await tags.selectTag(req.body.name,req.body.user_id);
    // console.log(check);

       if (check && check.rowCount===0){
           var query =await tags.insertTag(req.body);
           console.log(query);
           var result = await tags.selectTag(req.body.name,req.body.user_id);
           res.json({status: "TRUE", result: result.rows});
       }
       else{
           res.json ({status: "FALSE", message:"Record already exist"});
        
       }
}


exports.selectAll = async(req,res)=>{
    var selectAll=await tags.tagList(req.body.user_id);
    if(selectAll.rowCount===0){
        res.json({status: "FALSE", message:"No records to print"})
    }
    else{
        res.json({status:"TRUE",result:selectAll.rows});
    }
}