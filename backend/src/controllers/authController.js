import User from "../models/User.js";
import Seller from "../models/Seller.js";
import generateUserToken from "../utils/generateUserToken.js";

export const registerCustomer = async (req, res) => {
  const user = await User.create({
    ...req.body,
    role: "customer",
    isApproved: true
  });
  res.json({ token: generateUserToken(user), user });
};

export const registerSeller = async (req, res) => {
  const user = await User.create({
    ...req.body,
    role: "seller",
    isApproved: false
  });
  await Seller.create({ ...req.body, userId: user._id });
  res.json({ message: "Seller registered. Await admin approval." });
};

export const loginUser = async (req, res) => {
  const { identifier, password } = req.body;
  const user = await User.findOne({
    $or: [{ email: identifier }, { phone: identifier }]
  });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ message: "Invalid credentials" });
  if (user.role === "seller" && !user.isApproved)
    return res.status(403).json({ message: "Seller pending approval" });

  res.json({ token: generateUserToken(user), user });
};
