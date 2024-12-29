const Talent = require("../../api/v1/talent/model");

const getAllTalent = async ({ name, role }) => {
  let condition = {};
  if (name) condition = { ...condition, name: { $regex: name, $options: "i" } };
  if (role) condition = { ...condition, role: { $regex: role, $options: "i" } };

  const result = await Talent.find(condition);
  return result;
};

const getTalentById = async (id) => {
  const result = await Talent.findById(id);
  return result;
};

const getTalentByName = async (name) => {
  const result = await Talent.findOne({ name });
  return result;
};

const createTalent = async ({ name, role, image }) => {
  const result = await Talent.create({ name, role, image });
  return result;
};

const updateTalentById = async (id, { name, role, image }) => {
  const result = await Talent.findByIdAndUpdate(
    id,
    { name, role, image },
    { new: true }
  );
  return result;
};

const deleteTalentById = async (id) => {
  const result = await Talent.findByIdAndDelete(id, {
    new: true,
  });
  return result;
};

module.exports = {
  getAllTalent,
  getTalentById,
  getTalentByName,
  createTalent,
  updateTalentById,
  deleteTalentById,
};
