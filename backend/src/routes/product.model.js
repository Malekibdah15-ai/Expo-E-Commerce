import {Router} from "express"
// import { protectRoute } from '../middleware/auth.middleware.js';
import { getProduct} from '../controllers/product.controller.js'
import { getAllProducts } from "../controllers/admin.controller.js";

const router = Router();

// router.use(protectRoute)

router.get("/", getAllProducts)
router.get("/:id", getProduct)

export default router