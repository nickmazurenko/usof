const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const postsController = require("../controllers/posts");
const auth = require("../middleware/auth");
router.route("/:id").get(postsController.getPost);

router.route("/").get(postsController.getPosts);

module.exports = router;
