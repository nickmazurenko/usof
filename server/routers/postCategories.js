const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const postCategoriesController = require("../controllers/postCategories");
const auth = require("../middleware/auth");

/**
 *  @route    GET /api/posts/categories/<post_id>
 *  @desc     get all categories associated with the specified post
 *  @access   Private
 */
router.route("/:id").get(postCategoriesController.getPostCategories);

module.exports = router;
