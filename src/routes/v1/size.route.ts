import express from "express";
import validate from "../../middlewares/validate";
import { sizeController } from "../../controllers";
import sizeValidation from "../../validations/size.validation";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: sizes
 *     description: Size management and retrieval
 */
/**
 * @swagger
 * /sizes:
 *   post:
 *     summary: Create a new size
 *     description: Create a new size in the system.
 *     tags: [Sizes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Size name
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 size:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     name:
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
 *         description: Size already exists
 */
router.post(
  "/",
  validate(sizeValidation.createSize),
  sizeController.createSize
);

/**
 * @swagger
 * /sizes:
 *   get:
 *     summary: Query sizes
 *     description: Retrieve a list of sizes with optional pagination.
 *     tags: [Sizes]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: false
 *         description: Maximum number of sizes to return
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: false
 *         description: Page number for pagination
 *     responses:
 *       "200":
 *         description: A list of sizes
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
 *                   description: Total number of sizes
 */
router.get("/", validate(sizeValidation.querySize), sizeController.getSizes);

export default router;
