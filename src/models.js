const { PrimaryColumn } = require('typeorm');
const sequelize = require('./db')
const Sequelize = require('sequelize');


//Product Entity
const Product = sequelize.define("Product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

//Category entity

const Category = sequelize.define("Category", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

// USER ENTITy

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
  
  //Attemps entity
  const Attemps = sequelize.define("Attemps",{
    username: {
      type: Sequelize.STRING
    },
    count :{
      type: Sequelize.INTEGER
    }
  
  
  })

  const C_P = sequelize.define("Category_Product", {
    idProd: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull:false
      

    },
    idCat: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull:false
    }
  })
  
  //Relacion 1:1 User to Attemps
  Attemps.belongsTo(User,{
    foreingKey: 'username',
    targetkey: 'username'
  })
  sequelize.sync().then(() => {
    console.log('Tablas creadas o actualizadas en la base de datos.');
  });
  
module.exports= {User,Attemps, Product,Category}

