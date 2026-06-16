const { brandValidator } = require("../validator/brand.validator");
const CustomErrorHandler = require("../error/error");

const brandValidateMiddleware = (req, res, next) => {
  const { error } = brandValidator(req.body);
  if (error) {
    return next(CustomErrorHandler.BadRequest(error.details[0].message));
  }
  next();
};

module.exports = { brandValidateMiddleware };
