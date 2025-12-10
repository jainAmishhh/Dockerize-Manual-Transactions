import express from "express";

// Core Auth Controllers
import {
  emailLogin,
  emailSignup,
} from "../controllers/authUser.controller.js";

// Auth Middleware (Protect routes)
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

// PUBLIC AUTH ROUTES
router.post("/login", emailLogin);
router.post("/signup", emailSignup);

// PROTECTED ROUTES
router.use(authMiddleware);

export default router;
