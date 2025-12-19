import express from "express";
import userAuthMiddleware from "../middlewares/userAuthMiddleware.js";
const router = express.Router();

router.get("/profile", userAuthMiddleware(["customer"]), (req, res) =>
  res.json({ message: "Customer OK", customer: req.user })
);

export default router;
