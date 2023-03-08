import { verifyAccessToken } from "../utils/authUtils.js";
import { unauthorisedError } from "../utils/errors.js";

const verifyAcessToken = (request, response, next) => {
    const authHeader = request.headers['authorization'];

    try {
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            unauthorisedError();
        }

        const decodedToken = verifyAccessToken(token);

        request.userId = decodedToken.userId;
        next();

    } catch (error) {
        next(error);
    }
}

export default verifyAcessToken;