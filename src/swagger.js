// swagger.js
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path")
 //Definition of swagger options 
const options = {

  definition: {
    
    components: {},
    info: {
      title: 'tests',
      version: '3.1.0',
      description: 'Documentación de mi API',
    },
    servers:{
        url:"http://localhost:4000"
    }
  },
  apis: [`${path.join(__dirname, "./Routes/*.js")}`],
};

const specs = swaggerJSDoc(options);

module.exports = specs;