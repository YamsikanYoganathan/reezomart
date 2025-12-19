import express from "express";
import adminAuthMiddleware from "../middlewares/adminAuthMiddleware.js";

import {
  getPendingSellers,
  getApprovedSellers,
  approveSeller,
  rejectSeller
} from "../controllers/adminSellerController.js";

const router = express.Router();

// Dashboard test
router.get("/dashboard", adminAuthMiddleware, (req, res) => {
  res.json({ message: "Admin access granted" });
});

// Seller management
router.get("/sellers/pending", adminAuthMiddleware, getPendingSellers);
router.get("/sellers/approved", adminAuthMiddleware, getApprovedSellers);
router.put("/sellers/:userId/approve", adminAuthMiddleware, approveSeller);
router.delete("/sellers/:userId", adminAuthMiddleware, rejectSeller);

export default router;
