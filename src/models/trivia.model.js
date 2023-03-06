import { Schema, model } from 'mongoose';
import preguntaSchema from './pregunta.model.js';

/**
 * @swagger
 * components:
 *  schemas:
 *      Trivia:
 *          type: object
 *          properties:
 *              titulo:
 *                  type: string
 *                  description: Titulo de la trivia.
 *                  example: "Titulo de prueba"
 *              descripcion:
 *                  type: string
 *                  description: Descripcion de la trivia.
 *                  example: "Descripcion de pruba"
 *              es_privada:
 *                  type: boolean
 *                  description: Si la trivia es privada o publica.
 *              preguntas: 
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Pregunta'
 */
const triviaSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: String,
    es_privada: {
        type: Boolean,
        required: true
    },
    preguntas: {
        type: [preguntaSchema],
        validate: [v => Array.isArray(v) && v.length > 0, 'Path `preguntas` is required.'],
    }
});

triviaSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id;
        delete returnedObj._id;
        delete returnedObj.__v;
    }
});

const Trivia = model('Trivia', triviaSchema);

export default Trivia;