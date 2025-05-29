import express from "express";
import validate from "../../middlewares/validate";
import { storeController } from "../../controllers";
import storeValidation from "../../validations/store.validation";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: stores
 *     description: Store management and retrieval
 */
/**
 * @swagger
 * /stores:
 *   post:
 *     summary: Create a new store
 *     description: Create a new store in the system.
 *     tags: [stores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 description: Store name
 *               address:
 *                 type: string
 *                 description: Store address
 *               phone:
 *                 type: string
 *                 description: Store phone number
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Store email address
 *               description:
 *                 type: string
 *                 description: Store description
 *               logo:
 *                 type: string
 *                 description: Store logo URL
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 store:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     name:
 *                       type: string
 *                     slug:
 *                       type: string
 *                     address:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     email:
 *                       type: string
 *                     description:
 *                       type: string
 *                     logo:
 *                       type: string
 *                     deletedAt:
 *                       type: string
 *                       format: date-time
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       "400":
 *         description: Bad Request
 *       "409":
 *         description: Store already exists
 */
router.post(
  "/",
  validate(storeValidation.createStore),
  storeController.createStore
);

/**
 * @swagger
 * /stores:
 *   get:
 *     summary: Query stores
 *     description: Retrieve a list of stores with optional pagination.
 *     tags: [stores]
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
 *         description: A list of stores
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       name:
 *                         type: string
 *                       slug:
 *                         type: string
 *                       description:
 *                         type: string
 *                       address:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       email:
 *                         type: string
 *                       logo:
 *                         type: string
 *                       deletedAt:
 *                         type: string
 *                         format: date-time
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                 total:
 *                   type: integer
 *                   description: Total number of stores
 */
router.get(
  "/",
  validate(storeValidation.queryStores),
  storeController.getStores
);

/**
 * @swagger
 * /stores:
 *   patch:
 *     summary: Update a store
 *     description: Update an existing store by id.
 *     tags: [stores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: number
 *                 description: Store ID
 *               name:
 *                 type: string
 *                 description: Store name
 *               address:
 *                 type: string
 *                 description: Store address
 *               phone:
 *                 type: string
 *                 description: Store phone number
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Store email address
 *               description:
 *                 type: string
 *                 description: Store description
 *               logo:
 *                 type: string
 *                 description: Store logo URL
 *     responses:
 *       "200":
 *         description: Store updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 store:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     name:
 *                       type: string
 *                     slug:
 *                       type: string
 *                     address:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     email:
 *                       type: string
 *                     description:
 *                       type: string
 *                     logo:
 *                       type: string
 *                     deletedAt:
 *                       type: string
 *                       format: date-time
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       "400":
 *         description: Bad Request
 *       "404":
 *         description: Store not found
 */
router.patch(
  "/",
  validate(storeValidation.updateStore),
  storeController.updateStore
);

export default router;
