const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

require("dotenv").config();

const connectDB = require("./config/db.config");
const authRouter = require("./router/auth.routes");
const brandRouter = require("./router/brand.routes");
const carRouter = require("./router/car.routes");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();
const PORT = process.env.PORT || 4000;


app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.use("/uploads/images", express.static(path.join(__dirname, "uploads", "images")));


connectDB();


app.use(authRouter);   // /register, /verify, /login, /logout, /refresh
app.use(brandRouter);  // /brands, /brands/:id
app.use(carRouter);    // /cars, /cars/brand/:brandId, /cars/:id


app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server ishlamoqda: http://localhost:${PORT}`);
});
