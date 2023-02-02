const express = require("express");
const {Category} = require("../models");
const router = express.Router();
const bcrypt = require('bcryptjs');

//endpoint para la creacion de una categoria

router.post("/Create", async (req,res)=>{
    const {name, description} = req.body
    console.log(name)
    //Validacion de campos no vacios
    if (!name || !description) {
        return res.status(400).json({ error: 'Todos los campos son requeridos para crear categoria' });
      }
      //Validacion de si existe o no dicha categoria
    const category = await Category.findOne({where:{name:name}})
    if(category !== null) {
        return res.status(400).json({error:"la categoria ya se encuentra registrada"})
    }
    //Creacion de la categoria en la base de datos
    await Category.create({ 
        name,
        description
    })

    res.json({Msg:"Categoria Creada Exitosamente"})
})

///METODO PARA ACTUALIZAR LA CATEGORIA
router.put('/:id',async (req,res)=>{

    const id = req.params.id;
    const updatedCategory = req.body;

    if (!updatedCategory.name || !updatedCategory.description) {
        return res.status(400).json({ error: 'no pueden dejar campos vacios al actualizar categoria' });
      }
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

      Category.update(updatedCategory, { where: { id } })
      .then(([rowsUpdated]) => {
        if (rowsUpdated) {

          res.status(200).json({ message: 'Categoría actualizada correctamente' });


        } else {
          res.status(404).json({ message: 'No se encontró la categoría con el ID especificado' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'Ocurrió un error al actualizar la categoría', error });
      });
} )

router.get('/ListaCategoria', async (req,res) => {
  
  const Categorias =await Category.findAll({
    attributes: ['name', 'description']
  });
  res.status(200).json(Categorias);
})

module.exports =router


