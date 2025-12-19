import express from "express";
import userAuthMiddleware from "../middlewares/userAuthMiddleware.js";
const router = express.Router();

router.get("/dashboard", userAuthMiddleware(["seller"]), (req, res) =>
  res.json({ message: "Seller OK", seller: req.user })
);

export default router;
