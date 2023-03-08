import { Schema, model } from 'mongoose';

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *          description: |
 *              Ingrese el valor del `Bearer` token, por ejemplo:
 *              <br />
 *              <br />
 *              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDA3N2YwMWJhMmQ1M2IyMmRmM2MzMDIiLCJpYXQiOjE2NzgyOTc4OTgsImV4cCI6MTY3ODI5ODQ5OH0.RegJY88j9jPkRgqmCXvFhV9UDj07RseCE0sI3xyyhYg".
 *              <br />
 *              <br />
 *  schemas:
 *      Token:
 *          type: object
 *          properties:
 *              id:
 *                  type: string
 *                  description: ID del usuario.
 *                  example: "6408bc363d758b7244399b4f"
 *              accessToken:
 *                  type: string
 *                  description: Token de acceso.
 *                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDA3N2YwMWJhMmQ1M2IyMmRmM2MzMDIiLCJpYXQiOjE2NzgyOTc4OTgsImV4cCI6MTY3ODI5ODQ5OH0.RegJY88j9jPkRgqmCXvFhV9UDj07RseCE0sI3xyyhYg"
 *              refreshToken:
 *                  type: string
 *                  description: Token de actualización.
 *                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDA3N2YwMWJhMmQ1M2IyMmRmM2MzMDIiLCJpYXQiOjE2NzgyOTc4OTgsImV4cCI6MTY3ODI5ODQ5OH0.RegJY88j9jPkRgqmCXvFhV9UDj07RseCE0sI3xyyhYg"
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      RefreshToken:
 *          type: object
 *          properties:
 *              owner:
 *                  type: string
 *                  description: ID del usuario.
 *                  example: "6408bc363d758b7244399b4f"
 */
const refreshTokenSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

refreshTokenSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id;
        delete returnedObj._id;
        delete returnedObj.__v;
    }
});

const RefreshToken = model('RefreshToken', refreshTokenSchema);

export default RefreshToken;