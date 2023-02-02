const express = require("express");
const morgan= require("morgan")
const app = express();
const bodyParser = require('body-parser');
// Implementation of database


//use a middleware morgan 
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes to use in app
app.use(require("./src/Routes/UserRegister"))
app.use("/login",require("./src/Routes/Login"))
app.use("/category", require("./src/Routes/CreateCategory"))

//Listen on port localhost
app.listen(4000)

console.log("server on port 4000");