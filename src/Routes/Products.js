const express = require("express")
const {Product,Category,C_P} = require("../models")
const router = express.Router()
const {isFloat} =  require("../ValidateFunction")


//metodo post para la creacion de
router.post("/Create", async(req,res)=>{
    try{
        const {name,description,price,quantity, categoria} = req.body

         //validacion de campos no vacios 
         if((!name || !description || !price || !quantity || !categoria))
         return res.status(400).json({error: "Todos los campos son requeridos "})
        //buscamos la categoria y verificamos que exista
        const category  = await Category.findOne({where:{name: categoria}})
        //Verificamos que el id de la categoria exista para poder meter el producto
        if(category.name !== categoria) 
        return res.status(400).json({error: "Categoria no existe "})

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
        //CREAMOS EL PRODUCTO
       await Product.create({
            name,
            description,
            price,
            quantity
        }).then(product => {
            //antes de crear el producto, se mete a la tabla de interseccion para que se sepa su categoria
            const Cat_prod = {
            categoryId: category.id,
              productId: product.id
            
            };
                //Crea en la base de datos el registro de ese producto con su categoria
           C_P.create(Cat_prod)
          })
          .then(() => {
            //si es success devuelve la respuesta de la creacion
            res.status(201).json({ message: 'Producto y categoría guardados con éxito' });
          })
          .catch(error => {
            res.status(400).json({ message: 'Error al guardar producto y categoría' });
          });
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
        //validacion de campo precio
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



///Productos por categoria 

router.get("/Productos_por_categoria", async (req,res)=>{

    const products = Product.findAll({
        include: [{
            model: C_P,
            where: { id: 2 }
        }]
    });
      res.json(products)
})

module.exports = router