import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, default: "Admin" }
});

adminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

adminSchema.methods.matchPassword = function (pw) {
  return bcrypt.compare(pw, this.password);
};

export default mongoose.model("Admin", adminSchema);
