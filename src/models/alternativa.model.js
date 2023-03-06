import { Schema } from 'mongoose';

/**
 * @swagger
 * components:
 *  schemas:
 *      Alternativa:
 *          type: object
 *          properties:
 *              alternativa:
 *                  type: string
 *                  description: Texto de la alternativa.
 *                  example: "Respuesta 1"
 *              es_correcta:
 *                  type: boolean
 *                  description: Si la alternativa es correcta o no.
 */
const alternativaSchema = new Schema({
    alternativa: {
        type: String,
        required: true
    },
    es_correcta: {
        type: Boolean,
        required: true
    }
});

alternativaSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id;
        delete returnedObj._id;
    }
});

export default alternativaSchema;