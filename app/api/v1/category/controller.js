const Category = require("./model");

const create = async (req, res, next) => {
  try {
    const { name } = req.body;

    const createCategory = await Category.create({ name });

    res.status(201).json({
      data: createCategory,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const getAllCategory = await Category.find();

    res.status(200).json({
      data: getAllCategory,
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const getCategoryById = await Category.findById(id);

    if (!getCategoryById) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      data: getCategoryById,
    });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const existingCategory = await Category.findById(id);
    if (!existingCategory) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    const updateCategoryById = await Category.findByIdAndUpdate(
      existingCategory._id,
      { name },
      { new: true }
    );

    res.status(200).json({
      data: updateCategoryById,
    });
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingCategory = await Category.findById(id);
    if (!existingCategory) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    const deleteCategoryById = await Category.findByIdAndDelete(
      existingCategory._id,
      { new: true }
    );

    res.status(200).json({
      data: deleteCategoryById,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
