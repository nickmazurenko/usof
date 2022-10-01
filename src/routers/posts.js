const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const postsController = require("../controllers/posts");
const auth = require("../middleware/auth");
const { checkIfOwner } = require("../middleware/permissionChecks");

/**
 *  @route    GET /api/posts/<post_id>
 *  @desc     get specified post data
 *  @access   Private
 */
router.route("/:id").get(postsController.getPost);

/**
 *  @route    GET /api/posts/
 *  @desc     get all posts
 *  @access   Private
 */
router.route("/").get(postsController.getPosts);

/**
 *  @route    POST /api/posts/
 *  @desc     create a new post, required parameters are
 *            [title, content, categories]
 *  @access   Private
 */
router.route("/").post(
	auth,
	check("title", "Title should be at least 15 characters long").isLength({
		min: 15,
	}),
	check("content", "Content should be at least 30 characters long").isLength({
		min: 30,
	}),
	check("categories", "There should be at least one category").notEmpty(),
	postsController.createPost
);
/**
 *  @route    PATCH /api/posts/
 *  @desc     update a specified post, its
 *            [title, content, categories]
 * 						only for creator of post or admin
 *  @access   Private
 */
router.route("/:id").patch(auth, checkIfOwner, postsController.updatePost);

router.route("/:id").delete(auth, checkIfOwner, postsController.removePost);
module.exports = router;
