const CustomErrorHandler = require("../error/error");
const AuthSchema = require("../schema/auth.schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { access_token, refresh_token } = require("../utils/token-generator");

//  REGISTER 
const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Email mavjudmi?
    const existingUser = await AuthSchema.findOne({ email });
    if (existingUser) {
      throw CustomErrorHandler.BadRequest("Bu email allaqachon ro'yxatdan o'tgan");
    }

    // OTP kodi 
    const randomCode = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 9)
    ).join("");

    const otpTime = Date.now() + 2 * 60 * 1000; 

    const hashPassword = await bcrypt.hash(password, 12);

    await AuthSchema.create({
      username,
      email,
      password: hashPassword,
      otp: randomCode,
      otpTime,
    });

      console.log(`OTP kodi [${email}]: ${randomCode}`);

    res.status(201).json({
      message: "Ro'yxatdan o'tdingiz. Emailingizga kod yuborildi",
     
      otp: randomCode,
    });
  } catch (error) {
    next(error);
  }
};

// VERIFY 
const verify = async (req, res, next) => {
  try {
    const { email, code } = req.body;

    const foundedUser = await AuthSchema.findOne({ email });
    if (!foundedUser) {
      throw CustomErrorHandler.NotFound("Foydalanuvchi topilmadi");
    }

    if (foundedUser.otpTime < Date.now()) {
      throw CustomErrorHandler.UnAuthorized("Kod muddati tugagan. Qayta ro'yxatdan o'ting");
    }

    if (foundedUser.otp !== code) {
      throw CustomErrorHandler.UnAuthorized("Noto'g'ri kod");
    }

    const payload = {
      id: foundedUser._id,
      email: foundedUser.email,
      role: foundedUser.role,
    };

    const accessToken = access_token(payload);
    const refreshToken = refresh_token(payload);


    await AuthSchema.findByIdAndUpdate(foundedUser._id, { otp: "", otpTime: 0 });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // 15 daqiqa
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 kun
    });

    res.status(200).json({
      message: "Muvaffaqiyatli tasdiqlandi",
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN 
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const foundedUser = await AuthSchema.findOne({ email });
    if (!foundedUser) {
      throw CustomErrorHandler.NotFound("Foydalanuvchi topilmadi");
    }

    const isMatch = await bcrypt.compare(password, foundedUser.password);
    if (!isMatch) {
      throw CustomErrorHandler.UnAuthorized("Noto'g'ri parol");
    }

   
    const randomCode = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 9)
    ).join("");
    const otpTime = Date.now() + 2 * 60 * 1000;

    
   

    await AuthSchema.findByIdAndUpdate(foundedUser._id, {
      otp: randomCode,
      otpTime,
    });

    res.status(200).json({
      message: "Emailingizga kod yuborildi",

      otp: randomCode,
    });
  } catch (error) {
    next(error);
  }
};

// LOGOUT
const logout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({
      message: "Muvaffaqiyatli chiqildi",
    });
  } catch (error) {
    next(error);
  }
};

// REFRESH TOKEN 
const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken;

    if (!token) {
      throw CustomErrorHandler.UnAuthorized("Refresh token topilmadi");
    }

    const decoded = jwt.verify(token, process.env.REFRESH_SECRET_KEY);

    const payload = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    const newAccessToken = access_token(payload);

        res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({
      message: "Token muvaffaqiyatli yangilandi",
      accessToken: newAccessToken,
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(CustomErrorHandler.UnAuthorized("Refresh token muddati tugagan. Qayta login qiling"));
    }
    next(error);
  }
};

module.exports = {
  register,
  verify,
  login,
  logout,
  refreshToken,
};
