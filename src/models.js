const { PrimaryColumn } = require('typeorm');
const {sequelize} = require('./db')
const Sequelize = require('sequelize');


//Product Entity
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
 
  // Define el modelo de la tabla de intersección
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

// Relacion de uno a muchos entre Category y Product
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

// Relacion de muchos a muchos entre Category y Product a través de la tabla de intersección CategoryProduct
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
  //Relacion 1:1 User to Attemps
  Attemps.belongsTo(User,{
    foreingKey: 'username',
    targetkey: 'username'
  })

  sequelize.sync().then(() => {
    console.log('Tablas creadas o actualizadas en la base de datos.');
  });
  
module.exports= {User,Attemps, Product,Category, C_P}

