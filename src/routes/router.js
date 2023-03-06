import express from "express";
import handleError from "../middlewares/handleError.js";
import notFoundError from "../middlewares/notFoundError.js";
import apiRoutes from "./api/index.js";

const router = express.Router();

// router.get('/', async (request, response) => {
//     response.send("test1");
// });

// API ROUTES
router.use('/api', apiRoutes);

router.use(notFoundError);
router.use(handleError);

export default router;