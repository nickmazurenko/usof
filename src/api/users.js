import axios from "axios";
import { Endpoints } from "./endpoints";

const usersData = () => {
  return axios.get(Endpoints.users);
};

const currentUserData = (id) => {
  return axios.get(Endpoints.currentUser.replace("{id}", id));
};

export const Users = {
  usersData,
  currentUserData,
};
