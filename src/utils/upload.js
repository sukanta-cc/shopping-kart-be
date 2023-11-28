const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

var upload = multer({
	storage: storage,
	fileFilter: function (req, file, callback) {
		var ext = path.extname(file.originalname);
		if (
			ext !== ".png" &&
			ext !== ".jpg" &&
			ext !== ".gif" &&
			ext !== ".jpeg"
		) {
			return callback(new Error("Only images are allowed"));
		}
		callback(null, true);
	},
});

module.exports = upload;
