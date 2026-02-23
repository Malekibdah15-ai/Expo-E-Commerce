import express from "express"
import { protectRoute } from '../middleware/auth.middleware.js';
import {getCart,createCart, updateCart, deleteCart, clearCart} from '../controllers/cart.controller.js'

const router = express.Router();

router.use(protectRoute)

router.use("/", getCart)
router.post("/", createCart)
router.put("/:id", updateCart)
router.delete("/:id", deleteCart)
router.delete("/:id", clearCart)

export default router