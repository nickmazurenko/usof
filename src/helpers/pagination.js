const config = require('../config/keys.config');

const limit = Number(config.LIMIT);
const usersLimit = 10;

const getPagination = (page) => {
  const offset = page ? (page - 1) * limit : 0;

  return { limit, offset };
};

const getUsersPagination = (page) => {
  const offset = page ? (page - 1) * usersLimit : 0;

  return { limit: usersLimit, offset };
};

const getUsersPagingData = (data, page) => {
  const { count: items, rows: users } = data;
  const totalItems = items.length;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / usersLimit);
  return {
    totalItems,
    users,
    totalPages,
    currentPage,
  };
};

const getPagingData = (data, page) => {
  const { count: items, rows: posts } = data;
  const totalItems = items.length;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return {
    totalItems,
    posts,
    totalPages,
    currentPage,
  };
};

module.exports = {
  getPagination,
  getPagingData,
  getUsersPagination,
  getUsersPagingData,
};
