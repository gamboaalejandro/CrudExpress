// /*Module for user register API

const express = require("express");
const {User} = require("../models");
const router = express.Router();
const bcrypt = require('bcryptjs');
const Validator =  require("../ValidateFunction")

//Metodo Post para Registrar el usuario en la base de datos 
router.post('/registerUser', async (req, res) => {
    try {
      const { username, firstName, lastName, password, email } = req.body;
        const EncryptedPassword = await bcrypt.hash(password,12)
      // Validar los datos de entrada
      if ((!username || !password || !email || !firstName || !lastName) ) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
      }
      if((!Validator.validarEmail(email))){
        return res.status(400).json({ error: 'email no es valido' });

      }
        const user2 = await User.findOne({where:{username:username}})
      if (user2 !==null){
        return res.status(400).json({error:"Ya se encuentra registrado"})
      }
      // Crear un nuevo usuario
      const user = await User.create({
        username,
        firstName,
        lastName,
        email,
        password : EncryptedPassword
      })
      res.json(
        {
            Msg: username+"! Te has registrado exitosamente"
        }
      );
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
  module.exports = router
