const multer = require("multer");
const path = require("path");
const { cloudinary } = require("../utills/cloudinaryConfig");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

const imageUpload = multer({
  storage: multer.memoryStorage(),
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
      cb(new Error("Invalid file type"), false);
    }
  },
}).array("images", 10);

const uploadToCloudinary = (buffer, folder, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder,
      ...options,
    };
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    uploadStream.end(buffer);
  });
};

module.exports = { uploadToCloudinary, imageUpload };
