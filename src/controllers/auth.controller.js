import User from "../models/user.model.js";
import RefreshToken from "../models/refreshToken.model.js";
import { authError, unauthorisedError } from "../utils/errors.js";
import { createAccessToken, createRefreshToken, hashPassword, verifyPassword, verifyRefreshToken } from "../utils/authUtils.js";

const signup = async (request, response, next) => {

    const data = request.body;

    try {
        if (!data.hasOwnProperty('username')) {
            authError("Missing username.");
        }

        if (!data.hasOwnProperty('password')) {
            authError("Missing password.");
        }

        if (data.hasOwnProperty('username')) {
            const existUsername = await User.findOne({ username: data.username }).exec();
            if (existUsername) {
                authError("Username already exist.");
            }
        }

        let hash = '';

        try {
            hash = await hashPassword(data.password);
        } catch (error) {
            next(error);
        }

        const userDoc = new User({
            username: data.username,
            password: hash,
        });

        const refreshTokenDoc = new RefreshToken({
            owner: userDoc.id
        });

        try {
            await userDoc.save();
            await refreshTokenDoc.save();
        } catch (error) {
            next(error);
        }

        const refreshToken = createRefreshToken(userDoc.id, refreshTokenDoc.id);
        const accessToken = createAccessToken(userDoc.id);

        response.json({
            id: userDoc.id,
            accessToken,
            refreshToken
        });

    } catch (error) {
        next(error);
    }
}

const login = async (request, response, next) => {

    const data = request.body;

    try {
        if (!data.hasOwnProperty('username')) {
            authError("Missing username.");
        }

        if (!data.hasOwnProperty('password')) {
            authError("Missing password.");
        }

        const user = await User.findOne({ username: data.username }).select('+password').exec();

        if (!user) {
            authError("Wrong password or username");
        }

        const matchPassword = await verifyPassword(user.password, data.password);

        if (!matchPassword) {
            authError("Wrong password or username");
        }

        const refreshTokenDoc = new RefreshToken({
            owner: user.id
        });

        try {
            await refreshTokenDoc.save();
        } catch (error) {
            next(error);
        }

        const refreshToken = createRefreshToken(user.id, refreshTokenDoc.id);
        const accessToken = createAccessToken(user.id);

        response.json({
            id: user.id,
            accessToken,
            refreshToken
        });
    }
    catch (error) {
        next(error)
    }
}

const newRefreshToken = async (request, response, next) => {
    const data = request.body;

    try {
        if (!data.hasOwnProperty('refreshToken')) {
            unauthorisedError();
        }

        const currentRefreshToken = verifyRefreshToken(data.refreshToken);
        const tokenExist = await RefreshToken.exists({ _id: currentRefreshToken.tokenId, owner: currentRefreshToken.userId });

        if (!tokenExist) {
            unauthorisedError();
        }

        const refreshTokenDoc = new RefreshToken({
            owner: currentRefreshToken.userId
        });

        try {
            await refreshTokenDoc.save();
            await RefreshToken.findByIdAndRemove(currentRefreshToken.tokenId);
        } catch (error) {
            next();
        }

        const refreshToken = createRefreshToken(currentRefreshToken.userId, refreshTokenDoc.id);
        const accessToken = createAccessToken(currentRefreshToken.userId);

        response.json({
            id: currentRefreshToken.userId,
            accessToken,
            refreshToken
        });
    } catch (error) {
        next(error);
    }
}

const newAccessToken = async (request, response, next) => {
    const data = request.body;

    try {
        const currentRefreshToken = verifyRefreshToken(data.refreshToken);
        const tokenExist = await RefreshToken.exists({ _id: currentRefreshToken.tokenId, owner: currentRefreshToken.userId });

        if (!tokenExist) {
            unauthorisedError();
        }

        const accessToken = createAccessToken(currentRefreshToken.userId);

        response.json({
            id: currentRefreshToken.userId,
            accessToken,
            refreshToken: data.refreshToken
        });

    } catch (error) {
        next(error);
    }
}

const logout = async (request, response, next) => {

    const data = request.body;

    try {
        const refreshToken = verifyRefreshToken(data.refreshToken);
        const tokenExist = await RefreshToken.exists({ _id: refreshToken.tokenId, owner: refreshToken.userId });

        if (!tokenExist) {
            unauthorisedError();
        }

        try {
            await RefreshToken.deleteOne({ _id: refreshToken.tokenId });
        } catch (error) {
            next();
        }

        response.json({ success: true });

    } catch (error) {
        next(error);
    }
}

const logoutAll = async (request, response, next) => {

    const data = request.body;

    try {
        const refreshToken = verifyRefreshToken(data.refreshToken);
        const tokenExist = await RefreshToken.exists({ _id: refreshToken.tokenId, owner: refreshToken.userId });

        if (!tokenExist) {
            unauthorisedError();
        }

        try {
            await RefreshToken.deleteMany({ owner: refreshToken.userId });
        } catch (error) {
            next();
        }

        response.json({ success: true });

    } catch (error) {
        next(error);
    }
}

export {
    signup,
    login,
    newRefreshToken,
    newAccessToken,
    logout,
    logoutAll
}