module.exports=app=>{
    const userController=require("../controller/userController")
    const tagController=require("../controller/tagcontroller")
    const expenseController=require("../controller/expensesController")

    console.log("test");

    
    app.post("/users/postuser",userController.insertUserInfo);
    app.put("/users/userupdate",userController.updateUser);
    app.get("/users/userinfo",userController.selectAll);

    //react try with post
    app.post("/users/getinfo",userController.selectAll)
    app.get("/users/jointdata",userController.jointData)


    app.post("/tag/posttag",tagController.insertTags);
    app.post("/tag/gettag",tagController.selectAll);


    app.post("/expense/postexpense",expenseController.insertExpenseInfo)
    app.post("/expense/expenselist",expenseController.selectAll)


};