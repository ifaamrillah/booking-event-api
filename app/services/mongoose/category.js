const Category = require("../../api/v1/category/model");
const BadRequestError = require("../../errors/bad-request");

const getAllCategory = async () => {
  const result = await Category.find();
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
  // Check category name is unique
  const findName = await getCategoryByName(name);
  if (findName) throw new BadRequestError("Category already exists");

  const result = await Category.create({ name });
  return result;
};

const updateCategoryById = async (id, { name }) => {
  // Check existing category
  const findId = await getCategoryById(id);
  if (!findId) throw new BadRequestError("Category not found");

  // Check category name is unique
  const findName = await getCategoryByName(name);
  if (findName) throw new BadRequestError("Category already exists");

  const result = await Category.findByIdAndUpdate(id, { name }, { new: true });
  return result;
};

const deleteCategoryById = async (id) => {
  // Check existing category
  const findId = await getCategoryById(id);
  if (!findId) throw new BadRequestError("Category not found");

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
