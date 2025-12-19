import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  brandName: String,
  ownerName: String,
  nic: { type: String, unique: true },
  phone: String,
  sellerType: { type: String, enum: ["brand", "reseller"] }
});

export default mongoose.model("Seller", sellerSchema);
