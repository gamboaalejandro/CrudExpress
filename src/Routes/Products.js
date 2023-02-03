const express = require("express")
const {Product} = require("../models")
const router = express.Router()
const {isFloat} =  require("../ValidateFunction")


//metodo post para la creacion de
router.post("/Create", async(req,res)=>{
    try{
        const {name,description,price,quantity} = req.body
        if((!name || !description || !price || !quantity))
        return res.status(400).json({error: "Todos los campos son requeridos "})


        //validacion de no negatividad del precio y la cantidad
        if((price < 0 || quantity < 0))
        return res.status(400).json({error: "Los valores no pueden ser negativos"})

        //validacion si el campo cantidad es invalido
        if(!(Number.isFinite(quantity)))
        return res.status(400).json({error: "Campo Cantidad invalido "})

        else

        if(!(Number.isFinite(price))) 
        return res.status(400).json({error: "Campo Precio invalido "})
        const findProduct =await  Product.findOne({where: {name:name}})

        if (findProduct !== null) return res.status(400).json({error:"El producto ya se encuentra registrado"})

        await Product.create({
            name,
            description,
            price,
            quantity
        })
        res.json({Success: "Producto Creado exitosamente"})

    }catch (error) {
        return res.status(500).json({ error: error.message });
      }

})

router.put('/update/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        const updatedProduct = req.body;
        //validacion de campos vacios
        if((!updatedProduct.name || !updatedProduct.description || !updatedProduct.price || !updatedProduct.quantity))
        return res.status(400).json({error: "Todos los campos son requeridos "})


        //validacion de no negatividad del precio y la cantidad
        if((updatedProduct.price < 0 || updatedProduct.quantity < 0))
        return res.status(400).json({error: "Los valores no pueden ser negativos"})

        //validacion si el campo cantidad es invalido
        if(!(Number.isInteger(updatedProduct.quantity)))
        return res.status(400).json({error: "Campo Cantidad invalido "})

        else

        if(!(Number.isFinite(updatedProduct.price))) 
        return res.status(400).json({error: "Campo Precio invalido "})

        Product.update(updatedProduct, { where: { id } })
      .then(([rowsUpdated]) => {
        if (rowsUpdated) {
          res.status(200).json({ message: 'Producto actualizado Exitosamente' });
        } else {
          res.status(404).json({ message: 'No se encontró el producto con el ID especificado' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'Ocurrió un error al actualizar el producto', error });
      });

    }catch (error) {
        return res.status(500).json({ error: error.message });
      }
})

router.get('/listaProducto', async(req,res)=>{
    try{
        const Productos =await Product.findAll({
          attributes: ['name', 'description', 'price', 'quantity']
        });
        res.status(200).json(Productos);
      }catch (error) {
        return res.status(500).json({ error: error.message });
      }
})


module.exports = router