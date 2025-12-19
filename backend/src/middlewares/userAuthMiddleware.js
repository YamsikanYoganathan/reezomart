import jwt from "jsonwebtoken";
import User from "../models/User.js";

const userAuthMiddleware = (roles = []) => async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).select("-password");

  if (!user || (roles.length && !roles.includes(user.role)))
    return res.status(403).json({ message: "Access denied" });

  req.user = user;
  next();
};

export default userAuthMiddleware;
