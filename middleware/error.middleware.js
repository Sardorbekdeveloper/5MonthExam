const CustomErrorHandler = require("../error/error");

module.exports = function errorMiddleware(err, req, res, next) {
  
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      message: `Bu ${field} allaqachon mavjud. Boshqa qiymat kiriting`,
    });
  }

 
  if (err.name === "MulterError") {
    return res.status(400).json({
      message: err.message,
    });
  }

  
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Noto'g'ri ID format",
    });
  }


  if (err instanceof CustomErrorHandler) {
    return res.status(err.status).json({
      message: err.message,
      errors: err.error,
    });
  }

  return res.status(500).json({
    message: err.message || "Server xatosi",
  });
};
