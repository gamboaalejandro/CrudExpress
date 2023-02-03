const express = require("express")
const {
    Product,
    Category,
    C_P
} = require("../models")
const {
    sequelize,
    Sequelize
} = require("../db")

const router = express.Router()
/**
 *  @swagger
  * components:
 *  schemas:
 *    Product:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of Products
 *           default: Name Product
 *         description:
 *           type: string
 *           description: Description of Products
 *           default: Description of Product
 *         price:
 *           type: number
 *           description: Price of Products
 *           default: 1.0
 *         quantity:
 *           type: integer
 *           description: Quantity of products
 *           default: 1
 *         categoria:
 *           type: string
 *           description: Category that belogns products
 *           default: categoria
 *       required:
 *         - name
 *         - description
 *         - price
 *         - quantity
 *         - categoria
 *    UpdateProduct:
 *        type: object
 *        properties:
 *         name:
 *           type: string
 *           description: Name of Products
 *           default: Name Product
 *         description:
 *           type: string
 *           description: Description of Products
 *           default: Description of Product
 *         price:
 *           type: number
 *           description: Price of Products
 *           default: 1.0
 *         quantity:
 *           type: integer
 *           description: Quantity of products
 *           default: 1
 *        required:
 *          - name
 *          - description
 *          - price
 *          - quantity

 *         
 */



/**
  @swagger
 * /Products/Create:
 *   post:
 *     summary: Create a Product
 *     tags:
 *       - Products
 *     description: Create a product
 *     parameters:
 *       - name: Products
 *         in: body
 *         description: Product to register un database
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Product'
 * 
 *     responses:
 *       201:
 *         description: Product Successfully registered
 *       400:
 *         description: Invalid input data
 
 *       500:
 *         description: Internal Server Error 
 */
//"Create a POST endpoint at '/Create' to create a new product"
router.post("/Create", async (req, res) => {
    try {

        //"Get the values of the name, description, price, quantity, and categoria fields from the request body"
        const {
            name,
            description,
            price,
            quantity,
            categoria
        } = req.body
        console.log(req.body)
        //"Check if all the fields are present in the request body"
        if ((!name || !description || !price || !quantity || !categoria))
            return res.status(400).json({
                error: "Todos los campos son requeridos"
            })

        //"Find a category with the given name and check if it exists"
       
        const category = await Category.findOne({
            where: {
                name: categoria
            }
        })
    
        if (category.name !== categoria)
            return res.status(400).json({
                error: "la categoria no existe"
            })
            console.log("perreo")

        //"Check if the price and quantity are not negative"
        if ((price < 0 || quantity < 0))
            return res.status(400).json({
                error: "Los valores no pueden ser negativos"
            })

        //"Check if the quantity field is valid"
        if (!(Number.isFinite(quantity)))
            return res.status(400).json({
                error: "Cantidad Invalida"
            })

        else

            //"Check if the price field is valid"
            if (!(Number.isFinite(price)))
                return res.status(400).json({
                    error: "Precio Invalido"
                })

        //"Check if the product with the given name already exists"
        const findProduct = await Product.findOne({
            where: {
                name: name
            }
        })
        if (findProduct !== null) return res.status(400).json({
            error: "El producto ya existe"
        })

        //"Create a new product with the given name, description, price, and quantity"
        console.log("perreo")
        await Product.create({
                name,
                description,
                price,
                quantity
            }).then(product => {
                //"Create a record in the C_P table to link the product with its category"
                const Cat_prod = {
                    categoryId: category.id,
                    productId: product.id
                };
                C_P.create(Cat_prod)
            })
            .then(() => {
                // "Return a success response if the product and its category were successfully saved"
                res.status(201).json({
                    message: 'Producto y categoria Guardados satisfactoriamente'
                });
            })
            .catch(error => {
                //"Return an error response if there was an error saving the product and its category"
                res.status(400).json({
                    message: 'Error Guardando la categoria y el producto'
                });
            });
    } catch (error) {
        //"Return a server error response if there was an error"
        return res.status(500).json({
            error: error.message
        });
    }

})

/**
  @swagger
 * /Products/update/{id}:
 *   put:
 *     summary: Update a product
 *     tags:
 *       - Products
 *     description: Create a product
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Product to register un database
 *         required: true
 *         schema:
 *          type: integer
 *       - in: body
 *         name: body
 *         required: true
 *         description: Details the products to update 
 *         schema: 
 *            $ref: '#/components/schemas/UpdateProduct'
 *          
 *     responses:
 *       201:
 *         description: Product Successfully updated
 *       400:
 *         description: Invalid input data
 
 *       500:
 *         description: Internal Server Error 
 */

router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;

        //"Get the values of the name, description, price, quantity fields from the request body"
        const updatedProduct = req.body;
        //"Check if all the fields are present in the request body"
        if ((!updatedProduct.name || !updatedProduct.description || !updatedProduct.price || !updatedProduct.quantity))
            return res.status(400).json({
                error: "Todos los campos son requeridos "
            })


        //"Check if the price and quantity are not negative"
        if ((updatedProduct.price < 0 || updatedProduct.quantity < 0))
            return res.status(400).json({
                error: "Los valores no pueden ser negativos"
            })

        //"Check if the quantity field is valid"
        if (!(Number.isInteger(updatedProduct.quantity)))
            return res.status(400).json({
                error: "Campo Cantidad invalido "
            })

        else
            //"Check if the price field is valid"
            if (!(Number.isFinite(updatedProduct.price)))
                return res.status(400).json({
                    error: "Campo Precio invalido "
                })

        //UPDATING PRODUCT...
        Product.update(updatedProduct, {
                where: {
                    id
                }
            })
            .then(([rowsUpdated]) => {
                if (rowsUpdated) {
                    res.status(200).json({
                        message: 'Producto actualizado Exitosamente'
                    });
                } else {
                    res.status(404).json({
                        message: 'No se encontró el producto con el ID especificado'
                    });
                }
            })
            .catch(error => {
                res.status(500).json({
                    message: 'Ocurrió un error al actualizar el producto',
                    error
                });
            });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
})
/** 
 * @swagger
 * /Products/listaProducto:
 *   get:
 *     summary: Product list
 *     tags:
 *       - Products
 *     description: Obtiene una lista de todos los productos con sus atributos nombre, descripción, precio y cantidad.
 *     responses:
 *       200:
 *         description: Lista de productos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/UpdateProduct'
 *                      
 *       500:
 *         description: Error interno del servidor.
 */
//Product list
router.get('/listaProducto', async (req, res) => {
    try {
        const Productos = await Product.findAll({
            attributes: ['name', 'description', 'price', 'quantity']
        });
        res.status(200).json(Productos);
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
})

///Productos by Category
/** 
 * @swagger
 * /Products//Productos_por_categoria/{id}:
 *   get:
 *     summary: Product list
 *     tags:
 *       - Products
 *     description: Obtiene una lista de todos los productos con sus atributos nombre, descripción, precio y cantidad.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Product to register un database
 *         required: true
 *         schema:
 *          type: integer
 *     responses:
 *       200:
 *         description: Product list by Category.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/UpdateProduct'
 *                      
 *       500:
 *         description: Error interno del servidor.
 */

router.get("/Productos_por_categoria/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const cat = await Category.findOne({
            where: {
                id: id
            }
        })
        //Ejecucion del Query para poder obtener todos los productos por categoria
        sequelize.query("	SELECT pr.name as nombre, pr.description, pr.price, pr.quantity, cr.name from " + "\"Categories\"" + " as cr, " + "\"Products\"" + " as pr, " + "\"Category_Products\"" + " as cpr where pr.id= cpr." + "\"productId\"" +
                " and cr.id = cpr." + "\"categoryId\"" + " and cr.id =" + id + "", {
                    replacements: {
                        categoryId: cat.id
                    },
                    type: sequelize.QueryTypes.SELECT
                })
            .then(products => {
                res.json(products)
            })
            .catch(error => {
                console.error(error)
            });
    } catch (error) {
        res.status(500).json({
            message: "La Categoria no se encuentra registrada"
        });
    }
})

module.exports = router