const express = require("express");
const {Category} = require("../models");
const router = express.Router();


//endpoint para la creacion de una categoria

router.post("/Create", async (req,res)=>{
  try{
    //Creacion de la categora dado un body proveniente del cliente
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

    res.status(200).json({Msg:"Categoria Creada Exitosamente"})

  }catch (error) {
    return res.status(500).json({ error: error.message });
  }
    
})

///METODO PARA ACTUALIZAR LA CATEGORIA
router.put('/:id',async (req,res)=>{

  try{
    //Buscamos el ID de la categoria junto con los datos de la categoria actualizada previamente
    const id = req.params.id;
    const updatedCategory = req.body;

    //verificacion de campos no vacios
    if (!updatedCategory.name || !updatedCategory.description) {
        return res.status(400).json({ error: 'no pueden dejar campos vacios al actualizar categoria' });
      }

      //actualizacion de dicha categoria a la base de datos
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
    
  }catch (error) {
    return res.status(500).json({ error: error.message });
  }

} )

router.get('/ListaCategoria', async (req,res) => {
  try{
    const Categorias =await Category.findAll({
      attributes: ['name', 'description']
    });
    res.status(200).json(Categorias);
  }catch (error) {
    return res.status(500).json({ error: error.message });
  }

})

module.exports =router


