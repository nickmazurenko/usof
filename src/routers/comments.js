const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

const { checkIfOwner } = require("../middleware/permissionChecks");

/**
 *  @route    GET /api/comments/:id
 *  @desc     get specified comment data
 */
router.route("/:id").get(commentsController.getComment);

/**
 *  @route    PATCH /api/comments/:id
 *  @desc     update specified comment data
 */
router
	.route("/:id")
	.patch(
		auth,
		checkIfOwner,
		check("content", "Your comment must have content").notEmpty(),
		commentsController.updateComment
	);

/**
 *  @route    DELETE /api/comments/:id
 *  @desc     delete a comment
 */
router
	.route("/:id")
	.delete(auth, checkIfOwner, commentsController.removeComment);

module.exports = router;
