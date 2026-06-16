const joi = require("joi");

const brandValidator = (data) => {
  const schema = joi.object({
    name: joi.string().min(1).max(50).required().messages({
      "string.min": "Marka nomi kiritilishi shart",
      "string.max": "Marka nomi ko'pi bilan 50 ta belgi",
      "any.required": "Marka nomi kiritilishi shart",
    }),
  });
  return schema.validate(data);
};

module.exports = { brandValidator };
