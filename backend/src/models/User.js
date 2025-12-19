import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  phone: { type: String, unique: true, sparse: true },
  password: String,
  role: { type: String, enum: ["customer", "seller"], required: true },
  isApproved: { type: Boolean, default: false }
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.matchPassword = function (pw) {
  return bcrypt.compare(pw, this.password);
};

export default mongoose.model("User", userSchema);
