const { validationResult } = require('express-validator');
const categoriesService = require('../services/categories');
const handlers = require('../helpers/handlers');
const getTokenUser = require('../middleware/getTokenUser');
/**
 * Categories retrieval controller
 */
const getCategories = handlers.asyncHandler(async (request, response) => {
  try {
    await categoriesService.retrieveAll((error, data) => {
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
          'An error occurred during categories retrieval',
          null,
        ),
      );
  }
});

/**
 * Category retrieval controller
 */
const getCategory = handlers.asyncHandler(async (request, response) => {
  try {
    const { id } = request.params;
    await categoriesService.retrieveOne(id, (error, data) => {
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
          'An error occurred during category retrieval',
          null,
        ),
      );
  }
});

/**
 * Category posts retrieval controller
 */
const getCategoryPosts = handlers.asyncHandler(async (request, response) => {
  try {
    const { id } = request.params;
    const user = await getTokenUser(request.header('x-auth-token'));
    const { page } = request.query;
    await categoriesService.getCategoryPosts(
      { id, user, page },
      (error, data) => {
        if (error) {
          console.log(error);
          return response.status(error.code).json(error);
        }
        return response.status(data.code).json(data);
      },
    );
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json(
        handlers.responseHandler(
          false,
          500,
          'An error occurred during posts on category retrieval',
        ),
      );
  }
});

/**
 * Category creation controller
 */
const createCategory = handlers.asyncHandler(async (request, response) => {
  const errors = validationResult(request);
  if (errors.isEmpty()) {
    try {
      const category = {
        ...(request.body.title ? { categoryTitle: request.body.title } : {}),
        ...(request.body.description
          ? { description: request.body.description }
          : {}),
      };
      await categoriesService.create(category, (error, data) => {
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
            'An error occurred during category creation',
            null,
          ),
        );
    }
  } else {
    return response
      .status(404)
      .json(handlers.responseHandler(false, 404, errors.array()[0].msg, null));
  }
});

/**
 * Category update controller
 */
const updateCategory = handlers.asyncHandler(async (request, response) => {
  try {
    const { id } = request.params;
    const category = {
      ...(request.body.title ? { categoryTitle: request.body.title } : {}),
      ...(request.body.description
        ? { description: request.body.description }
        : {}),
    };
    await categoriesService.update({ category, id }, (error, data) => {
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
          'An error occurred during category update',
          null,
        ),
      );
  }
});

/**
 * Category removal controller
 */
const removeCategory = handlers.asyncHandler(async (request, response) => {
  try {
    const { id } = request.params;
    await categoriesService.remove(id, (error, data) => {
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
          'An error occurred during category removal',
          null,
        ),
      );
  }
});

module.exports = {
  getCategories,
  getCategory,
  getCategoryPosts,
  createCategory,
  updateCategory,
  removeCategory,
};
