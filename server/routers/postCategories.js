const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const postCategoriesController = require("../controllers/postCategories");
const auth = require("../middleware/auth");

router.route("/:id").get(postCategoriesController.getPostCategories);

module.exports = router;
