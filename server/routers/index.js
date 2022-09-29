const express = require("express");

const router = express.Router();

router.use("/users", require("./users"));
router.use("/auth", require("./auth"));
router.use("/posts", require("./posts"));
router.use("/posts/comments", require("./postComments"));
router.use("/posts/categories", require("./postCategories"));
module.exports = router;
