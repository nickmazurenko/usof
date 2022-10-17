const express = require('express');

const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/auth');
const auth = require('../middleware/auth');

/**
 *  @route    POST /api/auth/register
 *  @desc     registration of a new user, required parameters are
 * 						[login, email, password]
 */
router.route('/register').post(
  check('login', 'Your login is not valid').exists().isLength({ min: 5 }),
  check('email', 'Email is required')
    .exists()
    .trim()
    .normalizeEmail()
    .isEmail(),
  check('password', 'Password can not be empty').exists().isLength({ min: 6 }),
  check('confirmPassword', 'Passwords are not the same')
    .exists()
    .custom(async (confirmPassword, { req }) => {
      const { password } = req.body;
      if (password !== confirmPassword) {
        throw new Error('Passwords are not the same');
      }
    }),
  authController.register,
);

/**
 *  @route    GET /api/auth/confirm-email
 *  @desc     send email confirmation mail
 */
router
  .route('/confirm-email')
  .post(
    check('email', 'Email is required')
      .exists()
      .trim()
      .normalizeEmail()
      .isEmail(),
    authController.sendEmailVerification,
  );

/**
 *  @route    GET /api/auth/confirm-email/:token
 *  @desc     confirm email
 */
router.route('/confirm-email/:token').get(authController.verifyEmail);

/**
 *  @route    POST /api/auth/login
 *  @desc     log in user, required parameters are [login, email,password]
 * 						only users with a confirmed email can sign in
 */
router
  .route('/login')
  .post(
    [
      check('login', 'Your login is not valid').isLength({ min: 5 }),
      check('password', 'Password can not be empty').not().isEmpty(),
    ],
    authController.login,
  );

/**
 *  @route GET /api/auth
 *  @desk get logged in user
 */
router.route('/').get(auth, authController.getUser);

/**
 *  @route    POST /api/auth/logout
 *  @desc     log out authorized user
 */
router.route('/logout').post(auth, authController.logout);

/**
 *  @route    POST /api/auth/password-reset
 *  @desc     send a reset link to user email, required parameter is [email]
 */
router
  .route('/password-reset')
  .post(
    check('email', 'Email is required')
      .exists()
      .trim()
      .normalizeEmail()
      .isEmail(),
    authController.requestPasswordReset,
  );

/**
 *  @route    POST /api/auth/password-reset/:token
 *  @desc     confirm new password with a token from email, required parameter is a [new password]
 */
router
  .route('/password-reset/:token')
  .post(
    check('password', 'Password can not be empty').not().isEmpty(),
    authController.resetPassword,
  );

module.exports = router;
