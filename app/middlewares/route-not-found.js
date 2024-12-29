const { StatusCodes } = require("http-status-codes");

const routeNotFound = (req, res) => {
  return res.status(StatusCodes.NOT_FOUND).json({ msg: "Route not found" });
};

module.exports = routeNotFound;
