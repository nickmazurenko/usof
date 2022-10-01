const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

const {
	checkIfOwner,
	checkIfAdmin,
} = require("../middleware/permissionChecks");

router.route("/:id").get(commentsController.getComment);
router
	.route("/:id")
	.patch(
		auth,
		checkIfOwner,
		check("content", "Your comment must have content").notEmpty(),
		commentsController.updateComment
	);
router
	.route("/:id")
	.delete(auth, checkIfOwner, commentsController.removeComment);

module.exports = router;
