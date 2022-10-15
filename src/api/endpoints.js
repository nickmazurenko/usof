import config from '../config';

const Endpoints = {
  users: `${config.URL}/api/users`,
  userId: `${config.URL}/api/users/{id}`,
  createUser: `${config.URL}/api/users`,
  updateAvatar: `${config.URL}/api/users/avatar`,
  updateUser: `${config.URL}/api/users/{id}`,
  deleteUser: `${config.URL}/api/users/id`,
};

export default Endpoints;
