
const express = require("express");
const {User} = require("../models");
const router = express.Router();
const bcrypt = require('bcryptjs');
const Validator =  require("../ValidateFunction")

//Post method to register the user in the database
/**
 *  @swagger
  * components:
 *  schemas:
 *    User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user to be registered
 *         firstName:
 *           type: string
 *           description: The first name of the user
 *         lastName:
 *           type: string
 *           description: The last name of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *           default: string\@\string
 *       required:
 *         - username
 *         - firstname
 *         - lastName
 *         - password
 *         - email

 */
/**
  @swagger
 * /registerUser:
 *   post:
 *     summary: registro de usuario
 *     tags:
 *       - user
 *     description: Registers a user
 *     parameters:
 *       - name: user
 *         in: body
 *         description: User object to be registered
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successfully registered
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal Server Error 
 */
router.post('/registerUser', async (req, res) => {
    try {
      const { username, firstName, lastName, password, email } = req.body;
      console.log(username, firstName, lastName, password, email )
        const EncryptedPassword = await bcrypt.hash(password,12)
      // Validate input data
      if ((!username || !password || !email || !firstName || !lastName) ) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
      }
     
        const user2 = await User.findOne({where:{username:username}})
      if (user2 !==null){
        return res.status(400).json({error:"Ya se encuentra registrado"})
      }
      // Create User and save into database
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
