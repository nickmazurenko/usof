const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const categoriesController = require("../controllers/categories");
const auth = require("../middleware/auth");
const {
	checkIfOwner,
	checkIfAdmin,
} = require("../middleware/permissionChecks");

router.route("/").get(categoriesController.getCategories);
router.route("/:id").get(categoriesController.getCategory);
router.route("/posts/:id").get(categoriesController.getCategoryPosts);
module.exports = router;
