import express from "express";
import { inventoryController } from "../../controllers";
import validate from "../../middlewares/validate";
import { inventoryValidation } from "../../validations";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   - name: Inventory
 *     description: Product management and retrieval
 */
/**
 * @swagger
 * /inventory:
 *   post:
 *     summary: Create a new product inventory
 *     description: Create a new product inventory in the system.
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - storeId
 *               - amount
 *               - sizeId
 *               - colorId
 *             properties:
 *               productId:
 *                 type: number
 *                 description: ID of the product
 *               storeId:
 *                 type: number
 *                 description: ID of the store
 *               colorId:
 *                 type: number
 *                 description: ID of the color
 *               sizeId:
 *                 type: number
 *                 description: ID of the size
 *               amount:
 *                 type: number
 *                 description: Amount of the product in inventory
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 inventory:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     productId:
 *                       type: number
 *                     storeId:
 *                       type: number
 *                     colorId:
 *                       type: number
 *                     sizeId:
 *                       type: number
 *                     amount:
 *                       type: number
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                     deletedAt:
 *                       type: string
 *                       format: date-time
 *       "400":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *             example:
 *               error: "Invalid input data"
 *       "500":
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *             example:
 *               error: "An unexpected error occurred"
 */
router.post(
  "/",
  validate(inventoryValidation.createProductInventory),
  inventoryController.createProductInventory
);

/**
 * @swagger
 * /inventory:
 *   get:
 *     summary: Retrieve product inventories
 *     description: Retrieve a list of product inventories with pagination.
 *     tags: [Inventory]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       "200":
 *         description: Successful retrieval of product inventories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 inventories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       productId:
 *                         type: number
 *                       storeId:
 *                         type: number
 *                       colorId:
 *                         type: number
 *                       sizeId:
 *                         type: number
 *                       amount:
 *                         type: number
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 */
router.get(
  "/",
  validate(inventoryValidation.queryProductInventories),
  inventoryController.getProductInventories
);

export default router;
