const { Schema, model } = require("mongoose");

const Auth = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: false,
    },
    otpTime: {
      type: Number,
      required: false,
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin", "superadmin"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const AuthSchema = model("Auth", Auth);
module.exports = AuthSchema;
