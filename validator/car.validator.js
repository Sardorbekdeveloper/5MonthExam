const joi = require("joi");

const carValidator = (data) => {
  const schema = joi.object({
    brand_id: joi.string().hex().length(24).required().messages({
      "string.hex": "brand_id noto'g'ri format",
      "string.length": "brand_id 24 belgidan iborat bo'lishi kerak",
      "any.required": "brand_id kiritilishi shart",
    }),
    name: joi.string().min(2).max(100).required().messages({
      "string.min": "Mashina nomi kamida 2 ta belgi",
      "string.max": "Mashina nomi ko'pi bilan 100 ta belgi",
      "any.required": "Mashina nomi kiritilishi shart",
    }),
    price: joi.number().min(0).required().messages({
      "number.min": "Narx manfiy bo'lishi mumkin emas",
      "any.required": "Narx kiritilishi shart",
    }),
    color: joi.string().min(2).max(30).required().messages({
      "any.required": "Rang kiritilishi shart",
    }),
    engine_volume: joi.number().min(0.5).max(10).required().messages({
      "number.min": "Motor hajmi 0.5 dan kam bo'lishi mumkin emas",
      "number.max": "Motor hajmi 10 dan oshishi mumkin emas",
      "any.required": "Motor hajmi kiritilishi shart",
    }),
    mileage: joi.number().min(0).required().messages({
      "number.min": "Yurgan masofa manfiy bo'lishi mumkin emas",
      "any.required": "Yurgan masofa kiritilishi shart",
    }),
    description: joi.string().min(10).max(2000).required().messages({
      "string.min": "Tavsif kamida 10 ta belgi bo'lishi kerak",
      "string.max": "Tavsif ko'pi bilan 2000 ta belgi",
      "any.required": "Tavsif kiritilishi shart",
    }),
  });
  return schema.validate(data);
};

const carUpdateValidator = (data) => {
  const schema = joi.object({
    brand_id: joi.string().hex().length(24).messages({
      "string.hex": "brand_id noto'g'ri format",
    }),
    name: joi.string().min(2).max(100),
    price: joi.number().min(0),
    color: joi.string().min(2).max(30),
    engine_volume: joi.number().min(0.5).max(10),
    mileage: joi.number().min(0),
    description: joi.string().min(10).max(2000),
  });
  return schema.validate(data);
};

module.exports = { carValidator, carUpdateValidator };
