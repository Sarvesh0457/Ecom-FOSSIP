import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { getProductById } from "../middlewares/product.middleware.js";

import {
  createProduct,
  deleteProduct,
  updateProduct,
  getProducts,
  SingleProductById,
} from "../controllers/product.controller.js";

const router = Router();

router.get("/", getProducts);
router.post("/", verifyJWT, authorizeRoles("seller"), createProduct);

router.patch(
  "/:id",
  verifyJWT,
  authorizeRoles("seller"),
  getProductById,
  updateProduct,
);

router.delete(
  "/:id",
  verifyJWT,
  authorizeRoles("seller"),
  getProductById,
  deleteProduct,
);

// GET single product
router.get("/:id", SingleProductById);

export default router;
