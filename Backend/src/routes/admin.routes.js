import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { getAllUsers } from "../controllers/admin.controller.js";

const router = Router();

router.get("/users", verifyJWT, authorizeRoles("admin"), getAllUsers);

export default router;
