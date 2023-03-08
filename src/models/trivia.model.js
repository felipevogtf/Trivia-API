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
 *              user:
 *                  type: string
 *                  description: ID del usuario.
 *                  example: "6408bc363d758b7244399b4f"
 *              oculta:
 *                  type: boolean
 *                  description: Si la trivia es visible para todos o oculta.
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
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    oculta: {
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