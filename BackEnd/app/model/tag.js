const db=require("../../config/db");


exports.selectTag=async(name)=>{
    return await db.query("select id,name from tags where name='"+name+"'");
}

exports.insertTag=async(req)=>{
    let keys=Object.keys(req);
    let ourcolums=["name","user_id"];
    let insertkeys="";
    let insertvalues="";

        keys.forEach((key,i)=>{ 
            if(ourcolums.includes(key)){
                insertvalues=insertvalues+"'"+req[key]+"',";
                insertkeys=insertkeys+""+key+","
            }
        });
       return await db.query("insert into tags ("+insertkeys.substring(0,insertkeys.length-1)+") values ("+insertvalues.substring(0,insertvalues.length-1)+")");
 }



 exports.tagList=async(user_id)=>{
    return await db.query("select name from tags where user_id="+user_id)
}