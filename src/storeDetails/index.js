const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const adminRouter = require("../middlewares/adminRoute");
const multer = require("multer");
const services = require("./services");

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

var upload = multer({ storage: storage });

const router = express.Router();

router.use(verifyToken);
router.use(adminRouter);

/**
 * @route - POST /api/store/logo
 * @description - Api to upload a store logo
 */
router.post("/logo", upload.single("logo"), (req, res) => {
	services
		.logoUpload(req)
		.then((result) => res.status(200).json(result))
		.catch((err) => res.status(err.status ?? 500).json(err));
});

/**
 * @route - POST /api/store/banner
 * @description - Api to upload a store logo
 */
router.post("/banner", upload.single("banner"), (req, res) => {
	services
		.bannerUpload(req)
		.then((result) => res.status(200).json(result))
		.catch((err) => res.status(err.status ?? 500).json(err));
});

/**
 * @route - POST /api/store/logo
 * @description - Api to get a store logo
 */
router.get("/logo", upload.single("logo"), (req, res) => {
	services.getImage(req, res);
});

module.exports = router;
