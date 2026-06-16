const { Router } = require("express");
const {getAllCars,getCarsByBrand, getOneCar, addCar, updateCar, deleteCar} = require("../controller/car.controller");
const authorization = require("../middleware/authorization");
const adminChecker = require("../middleware/admin-checker");
const { carValidateMiddleware, carUpdateValidateMiddleware } = require("../middleware/car.validate.middleware");
const upload = require("../config/multer");

const carRouter = Router();

carRouter.get("/cars", authorization, getAllCars);


carRouter.get("/cars/brand/:brandId", authorization, getCarsByBrand);


carRouter.get("/cars/:id", authorization, getOneCar);


carRouter.post("/cars", adminChecker, upload.single("image"), carValidateMiddleware,
  addCar);


carRouter.put("/cars/:id", adminChecker, upload.single("image"),
  carUpdateValidateMiddleware, updateCar);

carRouter.delete("/cars/:id", adminChecker, deleteCar);

module.exports = carRouter;
