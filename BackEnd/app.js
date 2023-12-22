const express = require('express');
const app = express();
const port = 6000;
var cors = require('cors') 
app.use(cors())

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())





app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, options');
    next();
  });

  app.get('/', (req,res) => {
    res.send("hello world");
  })

  require("./App/routes/routes")(app);
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});