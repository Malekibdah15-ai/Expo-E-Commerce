import Router from "express"
// import { protectRoute } from '../middleware/auth.middleware.js';
import { createOrder,getUserOrder } from "../controllers/order.controller.js";
const router = Router()

// router.use(protectRoute)

router.post("/", createOrder)
router.get("/", getUserOrder)

export default router