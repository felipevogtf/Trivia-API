import express from "express";
import { getTrivias, findTrivia, saveTrivia, removeTrivia } from "../../controllers/trivia.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/trivia:
 *  get:
 *      description: Lista de todas las trivias.
 *      tags:
 *          -   Trivia
 *      responses:
 *          200:
 *              description: Ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Trivia'
 */
router.get('/', getTrivias);

/**
 * @swagger
 * /api/trivia/{id}:
 *  get:
 *      description: Buscar una trivia por el ID.
 *      tags:
 *          -   Trivia
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema: 
 *                  type: string
 *                  example: "6403a87a406c60a787461e36"
 *              description: ID de la trivia
 *      responses:
 *          200:
 *              description: Ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Trivia'
 *          400:
 *              description: Error en la request
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              errors:
 *                                  type: array
 *                                  items:
 *                                      type: string
 *                                  example: ["id is malformed."]
 *          404:
 *              description: No se ha encontrado una trivia con el ID solicitado.
 */
router.get('/:id', findTrivia);

/**
 * @swagger
 * /api/trivia:
 *  post:
 *      description: Guardar una trivia.
 *      tags:
 *          -   Trivia
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/Trivia' 
 *      responses:
 *          200:
 *              description: Ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Trivia'
 *          400:
 *              description: Error en la request
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              errors:
 *                                  type: array
 *                                  items:
 *                                      type: string
 *                                  example: ["preguntas: Path `preguntas` is required.", "titulo: Path `titulo` is required."]
 */
router.post('/', saveTrivia);

/**
 * @swagger
 * /api/trivia/{id}:
 *  delete:
 *      description: Buscar y elminar una trivia por el ID.
 *      tags:
 *          -   Trivia
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema: 
 *                  type: string
 *                  example: "6403a87a406c60a787461e36"
 *              description: ID de la trivia
 *      responses:
 *          204:
 *              description: Ok
 *          400:
 *              description: Error en la request
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              errors:
 *                                  type: array
 *                                  items:
 *                                      type: string
 *                                  example: ["id is malformed."]
 *          404:
 *              description: No se ha encontrado una trivia con el ID solicitado.
 */
router.delete('/:id', removeTrivia);

// UPDATE


export default router;