import express from "express";
import { productController } from "../../controllers";
import validate from "../../middlewares/validate";
import { productValidation } from "../../validations";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: Product management and retrieval
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product in the system.
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product name
 *               price:
 *                 type: number
 *                 description: Product price
 *               categoryId:
 *                 type: number
 *                 description: ID of the category the product belongs to
 *               thumbnail:
 *                 type: string
 *                 format: uri
 *                 description: URL of the product thumbnail image
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uri
 *                 description: Array of URLs for additional product images
 *               description:
 *                 type: string
 *                 description: Product description
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     categoryId:
 *                       type: string
 *                     thumbnail:
 *                       type: string
 *                     images:
 *                       type: array
 *                       items:
 *                         type: string
 *                     description:
 *                       type: string
 *       "400":
 *         description: Bad Request
 *       "500":
 *         description: Internal Server Error
 */
router.post(
  "/",
  validate(productValidation.createProduct),
  productController.createProduct
);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve all products
 *     description: Retrieve a list of all products in the system.
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: false
 *         description: Maximum number of stores to return
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: false
 *         description: Page number for pagination
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       price:
 *                         type: number
 *                       categoryId:
 *                         type: string
 *                       thumbnail:
 *                         type: string
 *                       images:
 *                         type: array
 *                         items:
 *                           type: string
 *                       description:
 *                         type: string
 */
router.get(
  "/",
  validate(productValidation.queryProducts),
  productController.getProducts
);

export default router;
