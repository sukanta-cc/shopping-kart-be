const express = require("express");
const services = require("./services");
const verifyToken = require("../middlewares/verifyToken");
const adminRouter = require("../middlewares/adminRoute");
const router = express.Router();

router.use(verifyToken);
router.use(adminRouter);
/**
 * @route - "/api/users"
 * @description - This api is for getting all users
 * @query - filter for filter by activation status and search for searching with name and email id
 */
router.get("/", (req, res) => {
	services
		.getAllUsers(req)
		.then((result) => res.status(200).send(result))
		.catch((err) => res.status(500).send(err));
});

/**
 * @route - "/api/users/:userId"
 * @description - This api is for getting user details
 */
router.get("/:userId", (req, res) => {
	services
		.getUserDetails(req)
		.then((result) => res.status(200).send(result))
		.catch((err) => res.status(500).send(err));
});

/**
 * @route - "/api/users/:userId"
 * @description - This api is for update user status
 */
router.put("/:userId", (req, res) => {
	services
		.updateUser(req)
		.then((result) => res.status(200).send(result))
		.catch((err) => res.status(500).send(err));
});

/**
 * @route - DELETE /api/users/:userId
 * @description - API to delete user
 */
router.delete("/:userId", (req, res) => {
    services
        .deleteUser(req)
        .then((result) => res.status(200).send(result))
        .catch((err) => res.status(500).send(err));
});

module.exports = router;
