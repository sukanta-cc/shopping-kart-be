const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const adminRouter = require("../middlewares/adminRoute");
const services = require("./services");
const upload = require("../utils/upload");

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

module.exports = router;
