const sequelize = require('./db')
const Sequelize = require('sequelize');
// USER ENTITy
const Product = sequelize.define("Product",{



})
const User = sequelize.define("User", {
    username: {
      type: Sequelize.STRING
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password:{
      type: Sequelize.STRING
    }
  });
  
  
module.exports= {User,Product}

