const { Schema, model } = require("mongoose");

const Brand = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,        
      trim: true,
    },
    image: {
      type: String,
      required: true,        
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const BrandSchema = model("Brand", Brand);
module.exports = BrandSchema;
