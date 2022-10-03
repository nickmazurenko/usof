const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const { checkIfAdmin } = require("../middleware/permissionChecks");
const { upload } = require("../middleware/avatar");

const usersController = require("../controllers/users");

/**
 *  @route    GET /api/users
 *  @desc     get all users
 */
router.route("/").get(usersController.getUsers);

/**
 *  @route    GET /api/users/:id
 *  @desc     get specified user data
 */
router.route("/:id").get(usersController.getUser);

/**
 *  @route    PATCH /api/users/avatar
 *  @desc     upload user avatar
 */
router
	.route("/avatar")
	.patch(auth, upload.single("avatar"), usersController.updateAvatar);

/**
 *  @route    remove /api/users/:id
 *  @desc     remove user
 */
router.route("/:id").delete(auth, usersController.removeUser);

/**
 *  @route    PATCH /api/users/:id
 *  @desc     update user data
 */
router.route("/:id").patch(auth, usersController.updateUser);

/**
 *  @route POST /api/users
 *  @desc create a new user, required parameters are
 *        [login, password, password confirmation, email, role]
 *        This feature is only accessible for admins
 */
router.route("/").post(
	auth,
	checkIfAdmin,
	check("login", "Your login is not valid").exists().isLength({ min: 5 }),
	check("email", "Email is required")
		.exists()
		.trim()
		.normalizeEmail()
		.isEmail(),
	check("password", "Password can not be empty").exists().isLength({ min: 6 }),
	check("confirmPassword", "Passwords are not the same")
		.exists()
		.custom(async (confirmPassword, { req }) => {
			const password = req.body.password;
			if (password !== confirmPassword) {
				throw new Error("Passwords are not the same");
			}
		}),
	usersController.createNewUser
);

module.exports = router;
