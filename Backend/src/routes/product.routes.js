import { Router } from "express";
import { getAllProducts } from "../controllers/product.controller.js";

const router = Router();

// Public route to fetch products (matches your frontend productapi.js)
router.get("/explore", getAllProducts);

export default router;