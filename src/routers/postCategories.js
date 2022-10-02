const express = require("express");
const router = express.Router();
const postCategoriesController = require("../controllers/postCategories");

/**
 *  @route    GET /api/posts/categories/<post_id>
 *  @desc     get all categories associated with the specified post
 */
router.route("/:id").get(postCategoriesController.getPostCategories);

module.exports = router;
