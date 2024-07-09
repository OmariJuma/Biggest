const multer = require("multer");
const path = require("path")
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const imageUpload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = path.extname(file.originalname).toLowerCase();
    const mimeType = fileTypes.test(file.mimetype);

    if (fileTypes.test(extname) && mimeType) {
      console.log("File type test pass");
      cb(null, true);
    } else {
      console.log("File type test fail");
      cb(null, false);
    }
  },
}).array("images", 10)

  module.exports={imageUpload};