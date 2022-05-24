const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const express = require("express");
const router = express.Router();
/**
 * 
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - name
 *         - lastname
 *       properties:
 *         id:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         name:
 *           type: string
 *         lastname:
 *           type: string
 *         validation_date:
 *           type: Date
 *         bearer_token:
 *           type: string
 *         validated:
 *           type: BOOLEAN
 *     UserAdd:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - name
 *         - lastname
 *       properties:
 *         id:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         name:
 *           type: string
 *         lastname:
 *           type: string
 *     Email:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 */

 /**
  * @swagger
  * tags:
  *   name: User
  *   description: The User managing API
  */
/**
 * @swagger
 * /users/:
 *   get:
 *     summary: Returns the list of all the User
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the User
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

 router.get("/", controller.getAll);
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserAdd'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserAdd'
 *       500:
 *         description: Some server error
 */
 router.post(
  "/",
  [
    verifySignUp.checkDuplicateEmail
  ],
  controller.signup
);
/**
 * @swagger
 * /users/genereToken:
 *   post:
 *     summary: Create a new Token
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Email'
 *     responses:
 *       200:
 *         description: The user was successfully genere Token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Email'
 *       500:
 *         description: Some server error
 */
  router.post("/genereToken", controller.genereToken);
  /**
 * @swagger
 * /users/valide:
 *   post:
 *     summary: validation user
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Email'
 *     responses:
 *       200:
 *         description: The user was successfully valide
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Email'
 *       500:
 *         description: Some server error
 */
   router.post("/valide", controller.validation);

module.exports = router;