import express from "express";
import triviaRoutes from "./trivia.route.js";
import authRoutes from "./auth.route.js";

const router = express.Router();

// router.get('/', async (request, response) => {
//     response.send("test31231");
// });

// ROUTES
router.use('/trivia', triviaRoutes);
router.use('/auth', authRoutes);


export default router;