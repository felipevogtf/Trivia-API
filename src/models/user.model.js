import { Schema, model } from 'mongoose';

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              username:
 *                  type: string
 *                  description: Nombre de usuario.
 *                  example: "fvogt01"
 *              password:
 *                  type: string
 *                  description: Contraseña del usuario.
 *                  example: "1234"
 */
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        select: false
    },
});

userSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id;
        delete returnedObj._id;
        delete returnedObj.__v;
    }
});

const User = model('User', userSchema);

export default User;