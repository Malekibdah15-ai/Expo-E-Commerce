import {Router} from 'express';
import { createProduct, getAllProducts, updateProduct, getAllOrders, updateOrderStatus, getAllCustomers, getDashboardStatus } from '../controllers/admin.controller.js';
import { adminOnly, protectRoute } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/multer.middleware.js';

const router = Router();
router.use(protectRoute,adminOnly);

router.post("/product", upload.array("image", 3), createProduct);
router.get("/products", getAllProducts);
router.put("/product/:id",upload.array("image", 3), updateProduct);

router.get("/orders", getAllOrders);
router.patch("/order/:id/status", updateOrderStatus);

router.get("/customers", getAllCustomers);
router.get("/status", getDashboardStatus);

export default router;