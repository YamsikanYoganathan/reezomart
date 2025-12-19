import express from "express";
import { registerCustomer, registerSeller, loginUser } from "../controllers/authController.js";
import { googleLogin } from "../controllers/socialAuthController.js";

const router = express.Router();

router.post("/register/customer", registerCustomer);
router.post("/register/seller", registerSeller);
router.post("/login", loginUser);
router.post("/social/google", googleLogin);

export default router;
