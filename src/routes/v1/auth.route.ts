import express from "express";
import validate from "../../middlewares/validate";
import { authController } from "../../controllers";
import { authValidation } from "../../validations";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user in the system.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - lastName 
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: User's password (min 8 characters)
 *               firstName:
 *                 type: string
 *                 description: User's first name
 *               lastName:
 *                 type: string
 *                 description: User's last name
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     idGenerated:
 *                       type: string
 *                     avatarUrl:
 *                       type: string
 *                     deletedAt:
 *                       type: string
 *                       format: date-time
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                 tokens:
 *                   type: object
 *                   properties:
 *                     access:
 *                       type: object
 *                       properties:
 *                         token:
 *                           type: string
 *                         expires:
 *                           type: string
 *                           format: date-time
 *       "400":
 *         description: Bad Request
 *       "409":
 *         description: Email already exists
 */
router.post(
  "/register",
  validate(authValidation.register),
  authController.register
);

/**
 * @swagger
 * /auth/health-check:
 *   get:
 *     summary: Check API health
 *     description: Check if the API is up and running.
 *     tags: [Authentication]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ok"
 */
router.get("/health-check", authController.checkHealth);
// router.post("/login", validate(authValidation.login), authController.login);
// router.post("/logout", validate(authValidation.logout), authController.logout);
// router.post(
//   "/refresh-tokens",
//   validate(authValidation.refreshTokens),
//   authController.refreshTokens
// );
// router.post(
//   "/forgot-password",
//   validate(authValidation.forgotPassword),
//   authController.forgotPassword
// );
// router.post(
//   "/reset-password",
//   validate(authValidation.resetPassword),
//   authController.resetPassword
// );
// router.post(
//   "/send-verification-email",
//   auth(),
//   authController.sendVerificationEmail
// );
// router.post(
//   "/verify-email",
//   validate(authValidation.verifyEmail),
//   authController.verifyEmail
// );

export default router;
