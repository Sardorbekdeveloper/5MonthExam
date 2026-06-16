const { Router } = require("express");
const { getAllBrands, getOneBrand, addBrand, updateBrand, deleteBrand} = require("../controller/brand.controller");
const authorization = require("../middleware/authorization");
const adminChecker = require("../middleware/admin-checker");
const { brandValidateMiddleware } = require("../middleware/brand.validate.middleware");
const upload = require("../config/multer");

const brandRouter = Router();

brandRouter.get("/brands", authorization, getAllBrands);

brandRouter.get("/brands/:id", authorization, getOneBrand);


brandRouter.post( "/brands", adminChecker, upload.single("image"),
  brandValidateMiddleware, addBrand);
brandRouter.put("/brands/:id",  adminChecker, upload.single("image"), updateBrand);

brandRouter.delete("/brands/:id", adminChecker, deleteBrand);

module.exports = brandRouter;
