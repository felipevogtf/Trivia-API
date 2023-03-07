import express from "express";
import { signup, login, newRefreshToken, newAccessToken, logout, logoutAll } from "../../controllers/auth.controller.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/refreshToken', newRefreshToken);
router.post('/accessToken', newAccessToken);
router.post('/logout', logout);
router.post('/logoutAll', logoutAll);

export default router;