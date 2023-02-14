import { getApiDao } from "../dbOperations/index.js";
import { options } from "../config/options.js";
import { convertToDto } from "../dbOperations/dtos/userDto.js";

const {
  CartDaoContainer,
  MessagesDaoContainer,
  ProductsDaoContainer,
  UsersDaoContainer,
} = await getApiDao(options.server.DBTYPE);

export const getUsers = async () => {
  const data = await UsersDaoContainer.getAll();
  const response = convertToDto(data);
  return response;
};

export const saveUser = async (body) => {
  return await UsersDaoContainer.save(body);
};
