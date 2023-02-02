const express = require("express");
const morgan= require("morgan")
const app = express();
const bodyParser = require('body-parser');
// Implementation of database


//use a middleware morgan 
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require("./src/Routes/UserRegister"))
//Listen on port localhost
app.listen(4000)

//routes to use in app


console.log("server on port 4000");