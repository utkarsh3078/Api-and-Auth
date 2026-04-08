import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    //it is obkect and contains key value pairs
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      enum: ["customer", "seller", "admin"],
      default: "customer",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verficationToken: { type: String, select: false },
    refreshToken: { type: String, select: false },
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpires: { type: String, select: false },
  },
  { timestamps: true },
);

export default mongoose.model("user", userSchema);

//select: false is used because when this model file gets returened then the elements which are assigned with these values are not returned(like passwords, passtokens)
