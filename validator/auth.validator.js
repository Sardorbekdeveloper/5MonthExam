const joi = require("joi");

const registerValidator = (data) => {
  const schema = joi.object({
    username: joi.string().min(3).max(30).required().messages({
      "string.min": "Username kamida 3 ta belgi bo'lishi kerak",
      "string.max": "Username ko'pi bilan 30 ta belgi bo'lishi kerak",
      "any.required": "Username kiritilishi shart",
    }),
    email: joi.string().email().required().messages({
      "string.email": "Email formati noto'g'ri",
      "any.required": "Email kiritilishi shart",
    }),
    password: joi.string().min(6).required().messages({
      "string.min": "Parol kamida 6 ta belgi bo'lishi kerak",
      "any.required": "Parol kiritilishi shart",
    }),
  });
  return schema.validate(data);
};

const loginValidator = (data) => {
  const schema = joi.object({
    email: joi.string().email().required().messages({
      "string.email": "Email formati noto'g'ri",
      "any.required": "Email kiritilishi shart",
    }),
    password: joi.string().required().messages({
      "any.required": "Parol kiritilishi shart",
    }),
  });
  return schema.validate(data);
};

const verifyValidator = (data) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    code: joi.string().length(6).required().messages({
      "string.length": "Kod 6 ta raqamdan iborat bo'lishi kerak",
      "any.required": "Kod kiritilishi shart",
    }),
  });
  return schema.validate(data);
};

module.exports = { registerValidator, loginValidator, verifyValidator };
