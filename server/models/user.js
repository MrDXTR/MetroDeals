import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  isAdmin: { type: Boolean, default: false, required:true },
  loginTime: { type: Date, default: Date.now()},
  loginType: { type: String, required: true },
});

export default mongoose.model("User", userSchema);