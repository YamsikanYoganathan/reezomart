import jwt from "jsonwebtoken";

export default (id) =>
  jwt.sign({ id, role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
