const express = require("express");
const app = express();

const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const categoryRouter = require("./app/api/v1/category/router");

const routeNotFound = require("./middlewares/route-not-found");
const errorHandler = require("./middlewares/error-handler");

const v1 = "/api/v1";

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to booking-event-api",
  });
});

// Routes
app.use(v1, categoryRouter);

// Middlewares
app.use(routeNotFound);
app.use(errorHandler);

module.exports = app;
