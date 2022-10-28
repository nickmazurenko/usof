const { validationResult } = require('express-validator');
const commentCommentsService = require('../services/commentComments');
const handlers = require('../helpers/handlers');
const { Comment } = require('../models/comments');

/**
 * Post comments retrieval controller
 */
const getComments = handlers.asyncHandler(async (request, response) => {
  try {
    const { id } = request.params;
    await commentCommentsService.retrieveAll(id, (error, data) => {
      if (error) {
        console.log(error);
        return response.status(error.code).json(error);
      }
      return response.status(data.code).json(data);
    });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json(
        handlers.responseHandler(
          false,
          500,
          'An error occurred during comments retrieval',
          null,
        ),
      );
  }
});

/**
 * Post comments creation controller
 */
const createComment = handlers.asyncHandler(async (request, response) => {
  const errors = validationResult(request);
  if (errors.isEmpty()) {
    try {
      const comment = Comment({
        content: request.body.content,
        userId: request.user.id,
        commentId: request.params.id,
      });

      await commentCommentsService.create(comment, (error, data) => {
        if (error) {
          console.log(error);
          return response.status(error.code).json(error);
        }
        return response.status(data.code).json(data);
      });
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json(
          handlers.responseHandler(
            false,
            500,
            'An error occurred during comment creation',
            null,
          ),
        );
    }
  } else {
    return response
      .status(400)
      .json(handlers.responseHandler(false, 400, errors.array()[0]?.msg, null));
  }
});

module.exports = {
  getComments,
  createComment,
};
