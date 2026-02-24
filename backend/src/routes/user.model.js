import Router from "express"
// import { protectRoute } from '../middleware/auth.middleware.js';
import { addAddreses,getAddreses, updateAddreses, deleteAddreses,addToWishlist, getWishlist,deleteFromWishlist } from "../controllers/user.controller.js";
const router  = Router()

// router.use(protectRoute)

router.post("/addreses", addAddreses)
router.get("/addreses", getAddreses)
router.put("/addreses/:id", updateAddreses)
router.delete("/addreses/:id", deleteAddreses)


router.post("/wishlist", addToWishlist)
router.get("/wishlist", getWishlist)
router.delete("/wishlist/:id", deleteFromWishlist)

export default router