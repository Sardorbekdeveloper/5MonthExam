const jwt = require("jsonwebtoken");
const CustomErrorHandler = require("../error/error");

module.exports = function authorization(req, res, next) {
  try {
    // Token cookie dan olinadi
    const token = req.cookies?.accessToken;

    if (!token) {
      throw CustomErrorHandler.UnAuthorized("Token topilmadi. Iltimos login qiling");
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(CustomErrorHandler.UnAuthorized("Token muddati tugagan. Refresh qiling"));
    }
    if (error.name === "JsonWebTokenError") {
      return next(CustomErrorHandler.UnAuthorized("Yaroqsiz token"));
    }
    next(error);
  }
};
