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
