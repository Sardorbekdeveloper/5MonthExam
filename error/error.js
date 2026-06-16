module.exports = class CustomErrorHandler extends Error {
  constructor(status, message, errors) {
    super(message);
    this.status = status;
    this.error = errors;
  }

  static BadRequest(message, error = []) {
    return new CustomErrorHandler(400, message, error);
  }

  static UnAuthorized(message, error = []) {
    return new CustomErrorHandler(401, message, error);
  }

  static Forbidden(message, error = []) {
    return new CustomErrorHandler(403, message, error);
  }

  static NotFound(message, error = []) {
    return new CustomErrorHandler(404, message, error);
  }
};
