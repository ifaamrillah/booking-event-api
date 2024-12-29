const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../../../errors/bad-request");
const NotFoundError = require("../../../errors/not-found");
const {
  createTalent,
  getAllTalent,
  getTalentById,
  updateTalentById,
  deleteTalentById,
  getTalentByName,
} = require("../../../services/mongoose/talent");
const { generateUrlFile, deleteFile } = require("../../../middlewares/multer");

const create = async (req, res, next) => {
  try {
    const { name, role } = req.body;
    const image = generateUrlFile({ file: req.file });

    // Check talent name is unique
    const findName = await getTalentByName(name);
    if (findName) {
      deleteFile({ path: image });
      throw new BadRequestError("Talent already exists");
    }

    // Create new talent
    const addNew = await createTalent({ name, role, image });

    res.status(StatusCodes.CREATED).json({
      data: addNew,
    });
  } catch (error) {
    if (req.file) deleteFile({ path: req.file.path });
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const { name, role } = req.query;

    // Get all talent
    const findAll = await getAllTalent({ name, role });

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

    // Check id is valid
    const findId = await getTalentById(id);
    if (!findId) throw new NotFoundError("Talent not found");

    res.status(StatusCodes.OK).json({
      data: findId,
    });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, role } = req.body;
    const image = generateUrlFile({ file: req.file });

    // Check id is valid
    const findId = await getTalentById(id);
    if (!findId) {
      deleteFile({ path: image });
      throw new NotFoundError("Talent not found");
    }

    // Check talent name is unique
    const findName = await getTalentByName(name);
    if (findName) {
      deleteFile({ path: image });
      throw new BadRequestError("Talent already exists");
    }

    // Delete old image
    if (image && findId.image) deleteFile({ path: findId.image });

    // Update talent
    const editById = await updateTalentById(id, {
      name,
      role,
      image: image ? image : undefined,
    });

    res.status(StatusCodes.OK).json({
      data: editById,
    });
  } catch (error) {
    if (req.file) deleteFile({ path: req.file.path });
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check id is valid
    const findId = await getTalentById(id);
    if (!findId) throw new NotFoundError("Talent not found");

    // Delete image
    if (findId.image) deleteFile({ path: findId.image });

    // Delete talent
    const removeById = await deleteTalentById(id);

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
