const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const postLikesController = require("../controllers/postLikes");
const auth = require("../middleware/auth");

/**
 *  @route    GET /api/posts/likes/<post_id>
 *  @desc     get all likes under the specified post
 *  @access   Private
 */
router.route("/:id").get(postLikesController.getPostLikes);

module.exports = router;
