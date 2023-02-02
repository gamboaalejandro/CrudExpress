
const express = require("express");

const router = express.Router();
const bcrypt = require('bcryptjs');
const {User, Attemps} = require("../models");



//EndPoint for User Login
router.get('/', async (req,res) =>{
    //Recibimos datos del body y procedemos a veriificar si este usuario esta registrado
    //dependiendo de las reglas de negocio establecidas es posible recibir el email o el username
    const {username, password} = req.body;
    if(!username || !password) return res.status(401).json({ error: 'Todos los campos son requeridos' });
    const User2 = await User.findOne({where :{username:username}})

    //si no se encuentra registrado devuelve error, deberia preguntar si desea registrarse
    if(!User2) return res.status(401).json({MsgError:"No se encuentra registrado"})

    //verificamos la contraseña
    const isMatchPassword = await bcrypt.compare(password,User2.password)

    //en este bloque de codigo verificamos que el usuario ingrese cierto numero de veces (security requirement)
    const attempts = await Attemps.findOne({ where: { username } });
    if (!isMatchPassword){
       
        if (attempts && attempts.count >= 3) {
          return res.status(429).json({
            success: false,
            message: "Has superado el límite de intentos permitidos"
          });
        }
        if (attempts) {
            console.log("holitas")
            attempts.count += 1;
            await attempts.save();
          } else {
            await Attemps.create({ username, count: 1 });
          }
        return res.status(401).json({MsgError:"Constraseña Incorrecta"})
    } 

    if (attempts) {
        attempts.count = 0;
        await attempts.save();
      } else {
        await Attemps.create({ username, count: 1 });
      }

    //llegado este punto significa que el usuario se encuentra registrado y damos permiso de loggin
    res.json({Msg:"Usted ha ingresado exitosamente"})

});

module.exports = router
