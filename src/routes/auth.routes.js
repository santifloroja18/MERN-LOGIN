import { Router } from "express";
import { register, login, logout, profile, verifyToken } from "../controllers/auth.controller.js";
import { requiredAuth } from "../middleware/tokenValidation.js";
import { validateSchema } from "../middleware/validator.middleware.js";
import { loginSchema, registerSchema } from "../schema/auth.schema.js";

const router = Router();

router.post('/register',validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema),login);
router.post('/logout', logout)
router.get('/verify', verifyToken);
router.get('/profile', requiredAuth, profile)

export default router;
