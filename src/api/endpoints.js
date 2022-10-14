import config from "../config";

const users = config.URL + "/api/users";
const currentUser = config.URL + "/api/users/{id}";
export const Endpoints = {
  users,
  currentUser,
};
