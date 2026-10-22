import { Router } from "express";
import { login } from "../controllers/AuthController.js";
// import { verifyToken } from "../middlewares/middleware.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { loginSchema } from "../validations/auth.validation.js";

const router = Router();

router.post("/login", validate(loginSchema), login);

export default router;