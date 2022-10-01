const express = require("express");

const router = express.Router();

router.use("/users", require("./users"));
router.use("/auth", require("./auth"));
router.use("/posts", require("./posts"));
router.use("/posts/comments", require("./postComments"));
router.use("/posts/categories", require("./postCategories"));
router.use("/posts/likes", require("./postLikes"));
router.use("/categories", require("./categories"));
router.use("/comments", require("./comments"));
router.use("/comments/likes", require("./commentLikes"));
module.exports = router;
