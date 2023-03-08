import express from "express";
import { signup, login, newRefreshToken, newAccessToken, logout, logoutAll } from "../../controllers/auth.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/auth/signup:
 *  post:
 *      description: Registrar cuenta de usuario.
 *      tags:
 *          -   Authenticate
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/User' 
 *      responses:
 *          200:
 *              description: Ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Token'
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
 *                                  example: ["Missing username.", "Missing password."]
 *          401:
 *              description: Acceso no autorizado
 *          500:
 *              description: Error interno
 */
router.post('/signup', signup);

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *      description: Iniciar sesión en el sistema.
 *      tags:
 *          -   Authenticate
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/User' 
 *      responses:
 *          200:
 *              description: Ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Token'
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
 *                                  example: ["Missing username.", "Missing password."]
 *          401:
 *              description: Acceso no autorizado
 *          500:
 *              description: Error interno
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/refreshToken:
 *  post:
 *      description: Obtener un nuevo token de actualización.
 *      tags:
 *          -   Authenticate
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema: 
 *                      type: object
 *                      properties:
 *                          refreshToken:
 *                                  type: string
 *                                  description: Token de actualización
 *                                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDA3N2YwMWJhMmQ1M2IyMmRmM2MzMDIiLCJ0b2tlbklkIjoiNjQwOGQ1MTM4ZDU1OTU2ZDJmYzMyYzdiIiwiaWF0IjoxNjc4MzAwNDM1LCJleHAiOjE2ODA4OTI0MzV9.OUk5pB8I1PjwsU68gXdfrcamp5dAtG9XInJH6ntMDnc"
 *      responses:
 *          200:
 *              description: Ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Token'
 *          401:
 *              description: Acceso no autorizado
 *          500:
 *              description: Error interno
 */
router.post('/refreshToken', newRefreshToken);

/**
 * @swagger
 * /api/auth/accessToken:
 *  post:
 *      description: Obtener un nuevo token de acceso.
 *      tags:
 *          -   Authenticate
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema: 
 *                      type: object
 *                      properties:
 *                          refreshToken:
 *                                  type: string
 *                                  description: Token de actualización
 *                                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDA3N2YwMWJhMmQ1M2IyMmRmM2MzMDIiLCJ0b2tlbklkIjoiNjQwOGQ1MTM4ZDU1OTU2ZDJmYzMyYzdiIiwiaWF0IjoxNjc4MzAwNDM1LCJleHAiOjE2ODA4OTI0MzV9.OUk5pB8I1PjwsU68gXdfrcamp5dAtG9XInJH6ntMDnc"
 *      responses:
 *          200:
 *              description: Ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Token'
 *          401:
 *              description: Acceso no autorizado
 *          500:
 *              description: Error interno
 */
router.post('/accessToken', newAccessToken);

/**
 * @swagger
 * /api/auth/logout:
 *  post:
 *      description: Cerrar sesión.
 *      tags:
 *          -   Authenticate
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema: 
 *                      type: object
 *                      properties:
 *                          refreshToken:
 *                                  type: string
 *                                  description: Token de actualización
 *                                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDA3N2YwMWJhMmQ1M2IyMmRmM2MzMDIiLCJ0b2tlbklkIjoiNjQwOGQ1MTM4ZDU1OTU2ZDJmYzMyYzdiIiwiaWF0IjoxNjc4MzAwNDM1LCJleHAiOjE2ODA4OTI0MzV9.OUk5pB8I1PjwsU68gXdfrcamp5dAtG9XInJH6ntMDnc"
 *      responses:
 *          200:
 *              description: Ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  description: Si se cerro con exito la sesión
 *          401:
 *              description: Acceso no autorizado
 *          500:
 *              description: Error interno
 */
router.post('/logout', logout);

/**
 * @swagger
 * /api/auth/logout:
 *  post:
 *      description: Cerrar sesión en todos los dispositivos.
 *      tags:
 *          -   Authenticate
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema: 
 *                      type: object
 *                      properties:
 *                          refreshToken:
 *                                  type: string
 *                                  description: Token de actualización
 *                                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDA3N2YwMWJhMmQ1M2IyMmRmM2MzMDIiLCJ0b2tlbklkIjoiNjQwOGQ1MTM4ZDU1OTU2ZDJmYzMyYzdiIiwiaWF0IjoxNjc4MzAwNDM1LCJleHAiOjE2ODA4OTI0MzV9.OUk5pB8I1PjwsU68gXdfrcamp5dAtG9XInJH6ntMDnc"
 *      responses:
 *          200:
 *              description: Ok
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  description: Si se cerro con exito la sesión
 *          401:
 *              description: Acceso no autorizado
 *          500:
 *              description: Error interno
 */
router.post('/logoutAll', logoutAll);

export default router;