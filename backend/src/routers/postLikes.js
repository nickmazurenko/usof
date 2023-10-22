const express = require('express');

const router = express.Router();
const { check } = require('express-validator');
const postLikesController = require('../controllers/postLikes');
const auth = require('../middleware/auth');

/**
 *  @route    GET /api/posts/likes/<post_id>
 *  @desc     get all likes under the specified post
 */
router.route('/:id').get(postLikesController.getPostLikes);

/**
 *  @route    POST /api/posts/likes/<post_id>
 *  @desc     create a new like under a post
 */
router.route('/:id').post(
  auth,
  check('type', 'Type should be included [like / dislike | 1 / 2]')
    .exists()
    .custom(async (type) => {
      if (type !== 1 && type !== 2 && type !== 'like' && type !== 'dislike') {
        throw new Error('Type should be included [like / dislike | 1 / 2]');
      }
    }),
  postLikesController.createLike,
);

/**
 *  @route    DELETE /api/posts/likes/:id
 *  @desc     delete like under a post
 *  @access   Private
 */
router.route('/:id').delete(auth, postLikesController.removeLike);

module.exports = router;
