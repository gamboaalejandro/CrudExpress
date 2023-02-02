const express = require("express");
const {Category} = require("../models");
const router = express.Router();
const bcrypt = require('bcryptjs');

//endpoint para la creacion de un producto

router.post("/Create", async (req,res)=>{
    const {name, description} = req.body
    console.log(name)
    if (!name || !description) {
        return res.status(400).json({ error: 'Todos los campos son requeridos para crear categoria' });
      }
    const category = await Category.findOne({where:{name:name}})

    if(category !== null) {
        return res.status(400).json({error:"la categoria ya se encuentra registrada"})
    
    }
    await Category.create({ 
        name,
        description
    })

    res.json({Msg:"Categoria Creada Exitosamente"})

})




module.exports =router


