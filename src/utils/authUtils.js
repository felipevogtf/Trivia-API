import jwt from "jsonwebtoken";
import * as argon2 from "argon2";
import { unauthorisedError } from "./errors.js";

const verifyPassword = async (hashPassword, rawPassword) => {
    const check = await argon2.verify(hashPassword, rawPassword);
    return check;
}

const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    } catch (error) {
        unauthorisedError();
    }
}

const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    } catch (error) {
        unauthorisedError();
    }
}

const createRefreshToken = (userId, refreshTokenId) => {
    return jwt.sign(
        {
            userId: userId,
            tokenId: refreshTokenId
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "30d"
        }
    );
}

const createAccessToken = (userId) => {
    return jwt.sign(
        {
            userId: userId
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "10m"
        }
    );
}

const hashPassword = (password) => {
    return argon2.hash(password);
}

export {
    createAccessToken,
    createRefreshToken,
    verifyAccessToken,
    verifyPassword,
    verifyRefreshToken,
    hashPassword
}