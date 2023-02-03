const Sequelize = require("sequelize");
// Conection to test database
//in my root has no password, put your password if you have
const sequelize = new Sequelize('test', 'postgres', "", {
  host: "localhost",
  dialect: "postgres"
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos.');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });

module.exports = {sequelize , Sequelize}