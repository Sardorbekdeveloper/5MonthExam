const CustomErrorHandler = require("../error/error");
const CarSchema = require("../schema/car.schema");
const BrandSchema = require("../schema/brand.schema");

const getAllCars = async (req, res, next) => {
  try {
    const cars = await CarSchema.find()
      .select("name image price brand_id")
      .populate("brand_id", "name"); 

    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};

const getCarsByBrand = async (req, res, next) => {
  try {
    const { brandId } = req.params;

    const brand = await BrandSchema.findById(brandId);
    if (!brand) {
      throw CustomErrorHandler.NotFound("Marka topilmadi");
    }

    const cars = await CarSchema.find({ brand_id: brandId }).select(
      "name image price"
    );

    res.status(200).json({
      brand: brand.name,
      total: cars.length,
      cars,
    });
  } catch (error) {
    next(error);
  }
};

const getOneCar = async (req, res, next) => {
  try {
    const { id } = req.params;

    const car = await CarSchema.findById(id)
      .select("name image price color engine_volume mileage description brand_id")
      .populate("brand_id", "name image"); // marka nomi va rasmi

    if (!car) {
      throw CustomErrorHandler.NotFound("Mashina topilmadi");
    }

    res.status(200).json(car);
  } catch (error) {
    next(error);
  }
};


const addCar = async (req, res, next) => {
  try {
    const { brand_id, name, price, color, engine_volume, mileage, description } =
      req.body;

    if (!req.file) {
      throw CustomErrorHandler.BadRequest("Mashina rasmi yuklanishi shart");
    }


    const brand = await BrandSchema.findById(brand_id);
    if (!brand) {
      throw CustomErrorHandler.NotFound("Bunday marka topilmadi");
    }

    const image = `http://localhost:${process.env.PORT || 4000}/uploads/images/${req.file.filename}`;

    await CarSchema.create({
      brand_id,
      name,
      image,
      price,
      color,
      engine_volume,
      mileage,
      description,
    });

    res.status(201).json({
      message: "Mashina muvaffaqiyatli qo'shildi",
    });
  } catch (error) {
    next(error);
  }
};

const updateCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { brand_id, name, price, color, engine_volume, mileage, description } =
      req.body;

    const car = await CarSchema.findById(id);
    if (!car) {
      throw CustomErrorHandler.NotFound("Mashina topilmadi");
    }

    const updateData = {brand_id, name, price, color, engine_volume, mileage,     description};


    if (req.file) {
      updateData.image = `http://localhost:${process.env.PORT || 4000}/uploads/images/${req.file.filename}`;
    }

    await CarSchema.findByIdAndUpdate(id, updateData);

    res.status(200).json({
      message: "Mashina muvaffaqiyatli yangilandi",
    });
  } catch (error) {
    next(error);
  }
};


const deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;

    const car = await CarSchema.findById(id);
    if (!car) {
      throw CustomErrorHandler.NotFound("Mashina topilmadi");
    }

    await CarSchema.findByIdAndDelete(id);

    res.status(200).json({
      message: "Mashina muvaffaqiyatli o'chirildi",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCars,
  getCarsByBrand,
  getOneCar,
  addCar,
  updateCar,
  deleteCar,
};
