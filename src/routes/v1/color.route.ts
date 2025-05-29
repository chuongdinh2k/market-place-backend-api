import express from "express";
import validate from "../../middlewares/validate";
import { colorController } from "../../controllers";
import colorValidation from "../../validations/color.validation";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: colors
 *     description: Color management and retrieval
 */
/**
 * @swagger
 * /colors:
 *   post:
 *     summary: Create a new color
 *     description: Create a new color in the system.
 *     tags: [colors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - colorCode
 *             properties:
 *               name:
 *                 type: string
 *                 description: Color name
 *               colorCode:
 *                 type: string
 *                 description: Color code (e.g., #FFFFFF)
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 color:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     name:
 *                       type: string
 *                     colorCode:
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
 *         description: Color already exists
 */
router.post(
  "/",
  validate(colorValidation.createColor),
  colorController.createColor
);

/**
 * @swagger
 * /colors:
 *   get:
 *     summary: Query colors
 *     description: Retrieve a list of colors with optional pagination.
 *     tags: [colors]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: false
 *         description: Maximum number of colors to return
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: false
 *         description: Page number for pagination
 *     responses:
 *       "200":
 *         description: A list of colors
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
 *                       colorCode:
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
 *                   description: Total number of colors
 */
router.get(
  "/",
  validate(colorValidation.queryColors),
  colorController.getColors
);

export default router;
