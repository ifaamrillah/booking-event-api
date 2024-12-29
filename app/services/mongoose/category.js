const Category = require("../../api/v1/category/model");

const getAllCategory = async ({ name }) => {
  // Filter
  let condition = {};
  if (name) {
    condition = { ...condition, name: { $regex: name, $options: "i" } };
  }

  const result = await Category.find(condition);
  return result;
};

const getCategoryById = async (id) => {
  const result = await Category.findById(id);
  return result;
};

const getCategoryByName = async (name) => {
  const result = await Category.findOne({ name });
  return result;
};

const createCategory = async ({ name }) => {
  const result = await Category.create({ name });
  return result;
};

const updateCategoryById = async (id, { name }) => {
  const result = await Category.findByIdAndUpdate(id, { name }, { new: true });
  return result;
};

const deleteCategoryById = async (id) => {
  const result = await Category.findByIdAndDelete(id, {
    new: true,
  });
  return result;
};

module.exports = {
  getAllCategory,
  getCategoryById,
  getCategoryByName,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
};
