import { Router } from "express";
import { 
  getCart, 
  addToCart, 
  updateCartQuantity, 
  removeFromCart 
} from "../controllers/cart.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Protect all cart routes
router.use(verifyJWT); 

router.route("/").get(getCart);
router.route("/add").post(addToCart);
router.route("/update").put(updateCartQuantity);
router.route("/remove/:productId").delete(removeFromCart);

export default router;