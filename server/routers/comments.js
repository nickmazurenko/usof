const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const commentsController = require("../controllers/comments");
const auth = require("../middleware/auth");

router.route("/:id").get(commentsController.getComments);
