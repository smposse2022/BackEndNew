import { getApiDao } from "../dbOperations/index.js";
import { options } from "../config/options.js";
import { convertToDto } from "../dbOperations/dtos/userDto.js";

const { UsersDaoContainer } = await getApiDao(options.server.DBTYPE);

export const getUsers = async () => {
  const data = await UsersDaoContainer.getAll();
  const response = convertToDto(data);
  return response;
};

export const saveUser = async (body) => {
  return await UsersDaoContainer.save(body);
};

export const deleteUser = async (userId) => {
  return await UsersDaoContainer.deleteById(userId);
};
