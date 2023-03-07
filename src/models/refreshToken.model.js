import { Schema, model } from 'mongoose';

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