const { Schema, model } = require("mongoose");

const Car = new Schema(
  {
    brand_id: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Mashina nomi juda qisqa"],
      maxlength: [100, "Mashina nomi juda uzun"],
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Narx manfiy bo'lishi mumkin emas"],
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    engine_volume: {
      type: Number,       // litrda, masalan: 1.5, 2.0, 3.5
      required: true,
      min: [0.5, "Motor hajmi noto'g'ri"],
      max: [10, "Motor hajmi noto'g'ri"],
    },
    mileage: {
      type: Number,       // km da
      required: true,
      min: [0, "Yurgan masofa manfiy bo'lishi mumkin emas"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: [10, "Tarif juda qisqa"],
      maxlength: [2000, "Tarif juda uzun"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const CarSchema = model("Car", Car);
module.exports = CarSchema;
