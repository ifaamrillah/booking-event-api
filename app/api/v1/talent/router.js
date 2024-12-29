const express = require("express");
const router = express.Router();
const {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
} = require("./controller");
const { uploadImage } = require("../../../middlewares/multer");

router.post("/talent", uploadImage.single("image"), create);
router.get("/talent", getAll);
router.get("/talent/:id", getById);
router.put("/talent/:id", uploadImage.single("image"), updateById);
router.delete("/talent/:id", deleteById);

module.exports = router;
