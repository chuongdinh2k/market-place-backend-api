import express from "express";
import validate from "../../middlewares/validate";
import { categoryController } from "../../controllers";
import categoryValidation from "../../validations/category.validation";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Categories
 *     description: Category management and retrieval
 */
/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     description: Create a new category in the system.
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - slug
 *             properties:
 *               name:
 *                 type: string
 *                 description: Category name
 *               slug:
 *                 type: string
 *                 description: Category slug (URL-friendly identifier)
 *               description:
 *                 type: string
 *                 description: Category description
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 category:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     name:
 *                       type: string
 *                     slug:
 *                       type: string
 *                     description:
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
 *         description: Category already exists
 */
router.post(
  "/",
  validate(categoryValidation.createCategory),
  categoryController.createCategory
);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Query categories
 *     description: Retrieve a list of categories with optional pagination.
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: false
 *         description: Maximum number of categories to return
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: false
 *         description: Page number for pagination
 *     responses:
 *       "200":
 *         description: A list of categories
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
 *                   description: Total number of categories
 */
router.get(
  "/",
  validate(categoryValidation.queryCategory),
  categoryController.getCategories
);

export default router;
