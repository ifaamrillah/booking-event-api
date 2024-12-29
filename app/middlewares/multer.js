const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadMiddleware = ({ formats, directory, maxSize }) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
      const fileExtension = path.extname(file.originalname);
      cb(null, directory + "-" + Date.now() + fileExtension);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (!formats || formats.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb({ message: "Unsupported file format" }, false);
    }
  };

  return multer({
    storage,
    limits: {
      fileSize: maxSize,
    },
    fileFilter,
  });
};

const uploadImage = uploadMiddleware({
  formats: ["image/jpeg", "image/png", "image/jpg"],
  directory: "images",
  maxSize: 1024 * 1024 * 5,
});

const generateUrlFile = ({ type = "single", file }) => {
  if (type === "single") {
    return file ? file.path : null;
  } else {
    return file ? file.map((f) => f.path) : null;
  }
};

const deleteFile = ({ type = "single", path }) => {
  if (type === "single") {
    fs.unlink(path, (err) => {
      if (err) console.error("Error deleting the image:", err);
    });
  } else {
    path.forEach((p) => {
      fs.unlink(p, (err) => {
        if (err) console.error(`Error deleting file ${p}:`, err);
      });
    });
  }
};

module.exports = {
  uploadImage,
  generateUrlFile,
  deleteFile,
};
