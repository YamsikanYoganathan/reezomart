import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import generateUserToken from "../utils/generateUserToken.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  const { idToken } = req.body;
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID
  });
  const { email, name, sub } = ticket.getPayload();

  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({
      fullName: name,
      email,
      password: sub,
      role: "customer",
      isApproved: true
    });
  }

  if (user.role !== "customer")
    return res.status(403).json({ message: "Only customers allowed" });

  res.json({ token: generateUserToken(user), user });
};
