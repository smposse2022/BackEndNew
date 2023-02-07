import { getApiDao } from "../dbOperations/index.js";
import { options } from "../config/options.js";

const {
  CartDaoContainer,
  MessagesDaoContainer,
  ProductsDaoContainer,
  UsersDaoContainer,
} = await getApiDao(options.server.DBTYPE);

export const getUsers = async () => {
  return await UsersDaoContainer.getAll();
};

export const saveUser = async (body) => {
  return await UsersDaoContainer.save(body);
};
