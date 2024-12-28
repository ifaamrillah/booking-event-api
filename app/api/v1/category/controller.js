const { StatusCodes } = require("http-status-codes");

const BadRequestError = require("../../../errors/bad-request");
const {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById,
} = require("../../../services/mongoose/category");

const create = async (req, res, next) => {
  try {
    const { name } = req.body;

    const addNew = await createCategory({ name });

    res.status(StatusCodes.CREATED).json({
      data: addNew,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const findAll = await getAllCategory();

    res.status(StatusCodes.OK).json({
      data: findAll,
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const findId = await getCategoryById(id);
    if (!findId) throw new BadRequestError("Category not found");

    res.status(200).json({
      data: findId,
    });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const editById = await updateCategoryById(id, { name });

    res.status(StatusCodes.OK).json({
      data: editById,
    });
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const removeById = await deleteCategoryById(id);

    res.status(StatusCodes.OK).json({
      data: removeById,
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
