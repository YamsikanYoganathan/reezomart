import User from "../models/User.js";
import Seller from "../models/Seller.js";

/**
 * GET all pending sellers
 * GET /api/admin/sellers/pending
 */
export const getPendingSellers = async (req, res) => {
  const sellers = await Seller.find()
    .populate({
      path: "userId",
      match: { isApproved: false },
      select: "fullName email phone role isApproved"
    });

  // remove null populated users
  const filtered = sellers.filter(s => s.userId);

  res.json(filtered);
};

/**
 * GET all approved sellers
 * GET /api/admin/sellers/approved
 */
export const getApprovedSellers = async (req, res) => {
  const sellers = await Seller.find()
    .populate({
      path: "userId",
      match: { isApproved: true },
      select: "fullName email phone role isApproved"
    });

  const filtered = sellers.filter(s => s.userId);

  res.json(filtered);
};

export const approveSeller = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (!user || user.role !== "seller") {
    return res.status(404).json({ message: "Seller not found" });
  }

  user.isApproved = true;
  await user.save();

  res.json({ message: "Seller approved successfully" });
};

export const rejectSeller = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (!user || user.role !== "seller") {
    return res.status(404).json({ message: "Seller not found" });
  }

  await Seller.findOneAndDelete({ userId });
  await User.findByIdAndDelete(userId);

  res.json({ message: "Seller rejected and removed" });
};
