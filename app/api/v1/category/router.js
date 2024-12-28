const express = require("express");
const router = express.Router();
const {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
} = require("./controller");

router.post("/category", create);
router.get("/category", getAll);
router.get("/category/:id", getById);
router.put("/category/:id", updateById);
router.delete("/category/:id", deleteById);

module.exports = router;
