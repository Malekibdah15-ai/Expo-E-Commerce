import {Router} from "express"
import { protectRoute } from '../middleware/auth.middleware.js';
const router = Router()

router.use(protectRoute)

router.use("/create-intent", makePayment)

export default router