const db=require("../../config/db");

var admin = require("firebase-admin");
var serviceAccount = require("../../config/firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

exports.selectUser=async(phone)=>{
    return await db.query("select id,name,phone from users where phone='"+phone+"'");
}

//insertuser query
exports.insertUser=async(req)=>{
    let keys=Object.keys(req);
    let ourcolums=["name","phone","auth_id"];
    let insertkeys="";
    let insertvalues="";

    const userRecord = await admin.auth().createUser({
        phoneNumber: "+91"+req.phone
      });

    if (userRecord.uid && userRecord.uid.length != 0){

        keys.forEach((key,i)=>{ 
            if(ourcolums.includes(key)){
                insertvalues=insertvalues+"'"+req[key]+"',";
                insertkeys=insertkeys+""+key+","
            }
        });
        let insertuser = await db.query("insert into users ("+insertkeys.substring(0,insertkeys.length-1)+") values ("+insertvalues.substring(0,insertvalues.length-1)+")");
        let insertuid = await db.query("update users set auth_id ='"+userRecord.uid+"' where phone='"+req.phone+"'")
        let user = await db.query(`SELECT * from users where auth_id = '${userRecord.uid}'`);
       let response = {status: "success", result: ""+user.rows};
        return response
    }
    else{
        return {status: "fail", result: ""+userRecord};
    }
      

}

//update user query 
exports.updateUser=async(req)=>{
    let keys=Object.keys(req);
    let ourcolums=["name","phone","auth_id"];
    let updateKeyValues="";

    keys.forEach((key,i)=>{
        if(ourcolums.includes(key)){
            if (updateKeyValues.length !== 0)
                updateKeyValues=updateKeyValues+`, ${key}='${req[key]}'`;
            else 
                updateKeyValues=updateKeyValues+` ${key}='${req[key]}'`;

        }
    });
    return await db.query("update users set "+updateKeyValues+" where phone ='"+req.phone+"'");
}

//user list query
exports.userList=async()=>{
    return await db.query("select * from users")
}