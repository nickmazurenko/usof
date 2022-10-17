const express = require('express');

const router = express.Router();
const { check } = require('express-validator');
const postCommentsController = require('../controllers/postComments');
const auth = require('../middleware/auth');

/**
 *  @route    GET /api/posts/comments/<post_id>
 *  @desc     get all comments for the specified post
 */
router.route('/:id').get(postCommentsController.getComments);

/**
 *  @route    POST /api/posts/comments/<post_id>
 *  @desc     create a new comment, required parameter is [content]
 */
router
  .route('/:id')
  .post(
    auth,
    check('content', 'Comment was not provided').not().isEmpty(),
    postCommentsController.createComment,
  );

module.exports = router;
