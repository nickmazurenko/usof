const express = require('express');

const router = express.Router();
const { check } = require('express-validator');
const categoriesController = require('../controllers/categories');
const auth = require('../middleware/auth');
const { checkIfAdmin } = require('../middleware/permissionChecks');

/**
 *  @route    GET /api/categories/
 *  @desc     get all categories
 */
router.route('/').get(categoriesController.getCategories);

/**
 *  @route    GET /api/categories/:id
 *  @desc     get specified category data
 */
router.route('/:id').get(categoriesController.getCategory);

/**
 *  @route    GET /api/categories/posts/:id
 *  @desc     get all posts associated with the specified category
 */
router.route('/posts/:id').get(categoriesController.getCategoryPosts);

/**
 *  @route    POST /api/categories/
 *  @desc     create a new category,
 * 						required parameter is [title]
 */
router
  .route('/')
  .post(
    auth,
    checkIfAdmin,
    check('title', 'Title needed to create category')
      .exists()
      .isLength({ min: 3, max: 15 }),
    categoriesController.createCategory,
  );

/**
 *  @route    PATCH /api/categories/:id
 *  @desc     update specified category data
 */
router
  .route('/:id')
  .patch(auth, checkIfAdmin, categoriesController.updateCategory);

/**
 *  @route    DELETE /api/categories/:id
 *  @desc     delete a category
 */
router
  .route('/:id')
  .delete(auth, checkIfAdmin, categoriesController.removeCategory);

module.exports = router;
