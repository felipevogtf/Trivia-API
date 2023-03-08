import { Schema } from 'mongoose';
import alternativaSchema from './alternativa.model.js';

/**
 * @swagger
 * components:
 *  schemas:
 *      Pregunta:
 *          type: object
 *          properties:
 *              pregunta:
 *                  type: string
 *                  description: Texto de la pregunta a responder.
 *                  example: "¿Pregunta de prueba?"
 *              imagen:
 *                  type: string
 *                  description: Ruta de la imagen de la pregunta.
 *                  example: "/assets/img.png"
 *              alternativas: 
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Alternativa'
 */
const preguntaSchema = new Schema({
    pregunta: {
        type: String,
        required: true
    },
    imagen: String,
    alternativas: {
        type: [alternativaSchema],
        validate: [v => Array.isArray(v) && v.length > 0, 'Path `alternativas` is required.']
    }
});

preguntaSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id;
        delete returnedObj._id;
    }
});


export default preguntaSchema;