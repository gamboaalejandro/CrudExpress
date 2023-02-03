const express = require("express");
const {Category} = require("../models");
const router = express.Router();

// Endpoint for creating a category

/**
 *  @swagger
  * components:
 *  schemas:
 *    Category:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the category
 *           default: Category
 *         description: 
 *           type: string
 *           description: Description of Category
 *       required:
 *         - name
 *         - description
 *         
 */


/**
  @swagger
 * /Category/Create:
 *   post:
 *     summary: Create a Category
 *     tags:
 *       - Category
 *     description: Create a Category
 *     parameters:
 *       - name: Category
 *         in: body
 *         description: Register a Category in db
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Category'
 * 
 *     responses:
 *       200:
 *         description: Category Successfully registered
 *       400:
 *         description: Invalid input data
 
 *       500:
 *         description: Internal Server Error 
 */
router.post("/Create", async (req, res) => {
  try {
    // Creation of the category from a body from the client
    const { name, description } = req.body
    console.log(name)
    // Empty field validation
    if (!name || !description) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
      }
      // Validation of whether or not the category exists
    const category = await Category.findOne({where:{name:name}})
    if(category !== null) {
        return res.status(400).json({error:"La categoria ya se encuentra registrada"})
    }
    // Creation of the category in the database
    await Category.create({ 
        name,
        description
    })

    res.status(200).json({Msg:"Categoria creada exitosamente"})

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})
/**
  @swagger
 * /Category/{id}:
 *   put:
 *     summary: Update a Category
 *     tags:
 *       - Category
 *     description: Update a Category
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Category id to find in db
 *         required: true
 *         schema:
 *          type: integer
 *       - name: Category
 *         in: body
 *         description: Update a category a Category in db
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Category'
 * 
 *     responses:
 *       200:
 *         description: Category Successfully registered
 *       400:
 *         description: Invalid input data
 
 *       500:
 *         description: Internal Server Error 
 */

/// METHOD TO UPDATE THE CATEGORY
router.put('/:id', async (req, res) => {
  try {
    // We look for the ID of the category along with the data of the previously updated category
    const id = req.params.id;
    const updatedCategory = req.body;

    // Empty field verification
    if (!updatedCategory.name || !updatedCategory.description) {
        return res.status(400).json({ error: 'No se permite dejar campos en blanco mientras actualiza categoria' });
      }

      // Updating the category in the database
      Category.update(updatedCategory, { where: { id } })
      .then(([rowsUpdated]) => {
        if (rowsUpdated) {
          res.status(200).json({ message: 'Categoria modificada satisfactoriamente' });
        } else {
          res.status(404).json({ message: 'No se encuentra la categoria con el Id especificado' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'Ha ocurrido un error mientras se actualizaba la categoria', error });
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})


/** 
 * @swagger
 * /Category/listaCategoria:
 *   get:
 *     summary: Category list
 *     tags:
 *       - Category
 *     description: Get a List of categorys
 *     responses:
 *       200:
 *         description: Category list.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                $ref: '#/components/schemas/Category'
 *                      
 *       500:
 *         description: Error interno del servidor.
 */

router.get('/ListaCategoria', async (req, res) => {
  try {
    const Categories = await Category.findAll({
      attributes: ['name', 'description']
    });
    res.status(200).json(Categories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

module.exports = router


