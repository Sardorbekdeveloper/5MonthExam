const { Router } = require("express");
const { register, verify, login, logout, refreshToken} = require("../controller/auth.controller");
const { registerValidateMiddleware, loginValidateMiddleware, verifyValidateMiddleware} = require("../middleware/auth.validate.middleware");

const authRouter = Router();

authRouter.post("/register", registerValidateMiddleware, register);

authRouter.post("/verify", verifyValidateMiddleware, verify);

authRouter.post("/login", loginValidateMiddleware, login);


authRouter.get("/logout", logout);

authRouter.get("/refresh", refreshToken);

module.exports = authRouter;
