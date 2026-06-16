const { registerValidator, loginValidator, verifyValidator } = require("../validator/auth.validator");
const CustomErrorHandler = require("../error/error");

// Register validatsiya
const registerValidateMiddleware = (req, res, next) => {
  const { error } = registerValidator(req.body);
  if (error) {
    return next(CustomErrorHandler.BadRequest(error.details[0].message));
  }
  next();
};

// Login validatsiya
const loginValidateMiddleware = (req, res, next) => {
  const { error } = loginValidator(req.body);
  if (error) {
    return next(CustomErrorHandler.BadRequest(error.details[0].message));
  }
  next();
};

// Verify validatsiya
const verifyValidateMiddleware = (req, res, next) => {
  const { error } = verifyValidator(req.body);
  if (error) {
    return next(CustomErrorHandler.BadRequest(error.details[0].message));
  }
  next();
};

module.exports = {
  registerValidateMiddleware,
  loginValidateMiddleware,
  verifyValidateMiddleware,
};
