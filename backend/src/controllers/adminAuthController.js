import Admin from "../models/Admin.js";
import generateAdminToken from "../utils/generateAdminToken.js";

export const adminLogin = async (req, res) => {
  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin || !(await admin.matchPassword(req.body.password)))
    return res.status(401).json({ message: "Invalid admin credentials" });

  res.json({ token: generateAdminToken(admin._id), admin });
};
