const { PrimaryColumn } = require('typeorm');
const {sequelize} = require('./db')
const Sequelize = require('sequelize');


//Product Entity: entity model For a product
const Product = sequelize.define("Product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descripcion: {
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

//Category entity: Entity model for products's Categories

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

// USER ENTITy: entity model for users

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
  
  //Attemps entity: helper entity to control attempts in Login
  const Attemps = sequelize.define("Attemps",{
    username: {
      type: Sequelize.STRING
    },
    count :{
      type: Sequelize.INTEGER
    }
  
  
  })
 
  // Definition model for intersection entity between Product and Category
const C_P = sequelize.define('Category_Product', {
  categoryId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Category',
      key: 'id'
    }
  },
  productId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'Product',
      key: 'id'
    }
  }
});

Category.hasMany(Product, {
  foreignKey: {
    name: "id",
    allowNull: false,
  }
});
Product.belongsTo(Category, {
  foreignKey: {
    name: "id",
    allowNull: false,
  }
});

// Many to Many relation between Category and Product
Category.belongsToMany(Product, {
  through: C_P,
  foreignKey: {
    name: "categoryId",
    allowNull: false,
  }
});
Product.belongsToMany(Category, {
  through: C_P,
  foreignKey: {
    name: "productId",
    allowNull: false,
  },
  as:'categories'
});
  //Relation 1:1 User to Attemps
  Attemps.belongsTo(User,{
    foreingKey: 'username',
    targetkey: 'username'
  })

  //Create or Update Datebase 
  sequelize.sync().then(() => {
    console.log('Tablas creadas o actualizadas en la base de datos.');
  });
  
module.exports= {User,Attemps, Product,Category, C_P}

