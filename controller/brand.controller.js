const CustomErrorHandler = require("../error/error");
const BrandSchema = require("../schema/brand.schema");

const getAllBrands = async (req, res, next) => {
  try {
    const brands = await BrandSchema.find().select("name image");
    res.status(200).json(brands);
  } catch (error) {
    next(error);
  }
};

// GET /brands/:id — bitta marka
const getOneBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await BrandSchema.findById(id);

    if (!brand) {
      throw CustomErrorHandler.NotFound("Marka topilmadi");
    }

    res.status(200).json(brand);
  } catch (error) {
    next(error);
  }
};


const addBrand = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!req.file) {
      throw CustomErrorHandler.BadRequest("Marka rasmi yuklanishi shart");
    }

    const image = `http://localhost:${process.env.PORT || 4000}/uploads/images/${req.file.filename}`;

    await BrandSchema.create({ name, image });

    res.status(201).json({
      message: "Marka muvaffaqiyatli qo'shildi",
    });
  } catch (error) {
    next(error);
  }
};

const updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const brand = await BrandSchema.findById(id);
    if (!brand) {
      throw CustomErrorHandler.NotFound("Marka topilmadi");
    }

    const updateData = { name };

    if (req.file) {
      updateData.image = `http://localhost:${process.env.PORT || 4000}/uploads/images/${req.file.filename}`;
    }

    await BrandSchema.findByIdAndUpdate(id, updateData);

    res.status(200).json({
      message: "Marka muvaffaqiyatli yangilandi",
    });
  } catch (error) {
    next(error);
  }
};

const deleteBrand = async (req, res, next) => {
  try {
    const { id } = req.params;

    const brand = await BrandSchema.findById(id);
    if (!brand) {
      throw CustomErrorHandler.NotFound("Marka topilmadi");
    }

    await BrandSchema.findByIdAndDelete(id);

    res.status(200).json({
      message: "Marka muvaffaqiyatli o'chirildi",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBrands,
  getOneBrand,
  addBrand,
  updateBrand,
  deleteBrand,
};
