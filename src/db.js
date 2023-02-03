const Sequelize = require("sequelize");
// Conection to test database
const sequelize = new Sequelize("test", "postgres", "darkipro1012", {
  host: "localhost",
  dialect: "postgres"
});
module.exports = {sequelize , Sequelize}