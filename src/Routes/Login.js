
const express = require("express");

const router = express.Router();
const bcrypt = require('bcryptjs');
const {User, Attemps} = require("../models");



//EndPoint for User Login
router.get('/', async (req,res) =>{
    //Get data from body
    //depending on the established business rules it is possible to receive the email or the username
    const {username, password} = req.body;
    if(!username || !password) return res.status(401).json({ error: 'Todos los campos son requeridos' });
    const User2 = await User.findOne({where :{username:username}})

    //If it is not registered, it returns an error, it should ask if you want to register
    if(!User2) return res.status(401).json({MsgError:"No se encuentra registrado"})

    //verify password
    const isMatchPassword = await bcrypt.compare(password,User2.password)

    // In this block of code we verify that the user enters a certain number of times (security requirement)
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
      //end of control attempts
 
    //At this point it means that the user is registered and we give permission to login
    res.json({Msg:"Usted ha ingresado exitosamente"})

});

module.exports = router
