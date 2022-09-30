const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const postLikesController = require("../controllers/postLikes");
const auth = require("../middleware/auth");

router.route("/:id").get(postLikesController.getPostLikes);

module.exports = router;
