import express from "express";
import { getTrivias, findTrivia, saveTrivia, removeTrivia, uptdateTrivia, getMyTrivias } from "../../controllers/trivia.controller.js";
import isAuth from "../../middlewares/isAuth.js";

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
 *          500:
 *              description: Error interno
 */
router.get('/', getTrivias);

/**
 * @swagger
 * /api/trivia/own:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      description: Lista de todas las trivias realizadas por el usuario.
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
 *          500:
 *              description: Error interno
 */
router.get('/own', isAuth, getMyTrivias);

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
 *              description: No se ha encontrado una trivia con el ID solicitado
 *          500:
 *              description: Error interno
 */
router.get('/:id', findTrivia);

/**
 * @swagger
 * /api/trivia:
 *  post:
 *      security:
 *          - bearerAuth: []
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
 *          500:
 *              description: Error interno
 */
router.post('/', isAuth, saveTrivia);

/**
 * @swagger
 * /api/trivia/{id}:
 *  delete:
 *      security:
 *          - bearerAuth: []
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
 *              description: No se ha encontrado una trivia con el ID solicitado
 *          500:
 *              description: Error interno
 */
router.delete('/:id', isAuth, removeTrivia);

/**
 * @swagger
 * /api/trivia/{id}:
 *  put:
 *      description: Buscar y modificar una trivia por el ID.
 *      tags:
 *          -   Trivia
 *      parameters:
 *          -   in: path
 *              name: id
 *              schema: 
 *                  type: string
 *                  example: "6403a87a406c60a787461e36"
 *              description: ID de la trivia
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
 *                                  example: ["id is malformed."]
 *          404:
 *              description: No se ha encontrado una trivia con el ID solicitado
 *          500:
 *              description: Error interno
 */
router.put('/:id', isAuth, uptdateTrivia);


export default router;