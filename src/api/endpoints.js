import config from '../config';

/**
 * Users endpoints
 */
export const users = `${config.URL}/api/users`;
export const userId = `${config.URL}/api/users/{id}`;
export const createUser = `${config.URL}/api/users`;
export const updateAvatar = `${config.URL}/api/users/avatar`;
export const updateUser = `${config.URL}/api/users/{id}`;
export const deleteUser = `${config.URL}/api/users/id`;

/**
 * Auth endpoints
 */
export const currentUserData = `${config.URL}/api/auth`;
export const registerUser = `${config.URL}/api/auth/register`;
export const loginUser = `${config.URL}/api/auth/login`;
export const logoutUser = `${config.URL}/api/auth/logout`;
export const confirmUserEmail = `${config.URL}/api/auth/confirm-email`;
export const resetUserPassword = `${config.URL}/api/auth/password-reset`;
export const resetUserPasswordToken = `${config.URL}/api/auth/password-reset/{token}`;

/**
 * Posts
 */

export const posts = `${config.URL}/api/posts`;
export const postId = `${config.URL}/api/posts/{id}`;
export const createPost = `${config.URL}/api/posts`;
export const updatePost = `${config.URL}/api/posts/{id}`;
export const deletePost = `${config.URL}/api/posts/{id}`;
export const getCategoryPosts = `${config.URL}/api/categories/posts/{id}`;

/**
 * Comments
 */
export const createPostComment = `${config.URL}/api/posts/comments/{id}`;
export const getPostComments = `${config.URL}/api/posts/comments/{id}`;

/**
 *Likes
 */
export const getPostLikes = `${config.URL}/api/posts/likes`;
export const createPostLike = `${config.URL}/api/posts/likes/{id}`;
export const deletePostLike = `${config.URL}/api/posts/likes/{id}`;

/**
 * Categories
 */
export const categories = `${config.URL}/api/categories`;
export const categoriesId = `${config.URL}/api/categories/{id}`;
export const createCategory = `${config.URL}/api/categories`;
export const updateCategory = `${config.URL}/api/categories/{id}`;
export const deleteCategory = `${config.URL}/api/categories/{id}`;
export const postCategories = `${config.URL}/api/posts/categories/{id}`;
