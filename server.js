const express = require("express");
const morgan= require("morgan")
const app = express();
const bodyParser = require('body-parser');
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerSpec = require('./src/swagger');
// Implementation of database


//use a middleware morgan 
app.use(express.json())
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes to use in app
app.use("/", require("./index"))
app.use(require("./src/Routes/UserRegister"))
app.use("/login",require("./src/Routes/Login"))
app.use("/category", require("./src/Routes/Category"))
app.use("/Products",require("./src/Routes/Products"))
//Endpoint for Documentation
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Listen on port localhost
app.listen(4000)

console.log("server on port 4000");