const jwt = require("jsonwebtoken");
const CustomErrorHandler = require("../error/error");

module.exports = function adminChecker(req, res, next) {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      throw CustomErrorHandler.UnAuthorized("Token topilmadi. Iltimos login qiling");
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;

    if (req.user.role !== "admin" && req.user.role !== "superadmin") {
      throw CustomErrorHandler.Forbidden("Bu amal faqat admin uchun ruxsat etilgan");
    }

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(CustomErrorHandler.UnAuthorized("Token muddati tugagan"));
    }
    if (error.name === "JsonWebTokenError") {
      return next(CustomErrorHandler.UnAuthorized("Yaroqsiz token"));
    }
    next(error);
  }
};
