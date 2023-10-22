const express = require('express');

const router = express.Router();
const { check } = require('express-validator');
const commentCommentsController = require('../controllers/commentComments');
const auth = require('../middleware/auth');

/**
 *  @route    GET /api/posts/comments/<post_id>
 *  @desc     get all comments for the specified post
 */
router.route('/:id').get(commentCommentsController.getComments);

/**
 *  @route    POST /api/posts/comments/<post_id>
 *  @desc     create a new comment, required parameter is [content]
 */
router
  .route('/:id')
  .post(
    auth,
    check('content', 'Comment was not provided').not().isEmpty(),
    commentCommentsController.createComment,
  );

module.exports = router;
