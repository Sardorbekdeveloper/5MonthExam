const { carValidator, carUpdateValidator } = require("../validator/car.validator");
const CustomErrorHandler = require("../error/error");

const carValidateMiddleware = (req, res, next) => {
  const { error } = carValidator(req.body);
  if (error) {
    return next(CustomErrorHandler.BadRequest(error.details[0].message));
  }
  next();
};

const carUpdateValidateMiddleware = (req, res, next) => {
  const { error } = carUpdateValidator(req.body);
  if (error) {
    return next(CustomErrorHandler.BadRequest(error.details[0].message));
  }
  next();
};

module.exports = { carValidateMiddleware, carUpdateValidateMiddleware };
