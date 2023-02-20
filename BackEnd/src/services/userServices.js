import { getApiDao } from "../dbOperations/index.js";
import { options } from "../config/options.js";
import { convertToDto } from "../dbOperations/dtos/userDto.js";
import { UserValidation } from "../dbOperations/validations/userValidations.js";

const { UsersDaoContainer } = await getApiDao(options.server.DBTYPE);

export const getUsers = async () => {
  try {
    const data = await UsersDaoContainer.getAll();
    const response = convertToDto(data);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const saveUser = async (body) => {
  try {
    UserValidation.validateUser(body, true);
    return await UsersDaoContainer.save(body);
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteUser = async (userId) => {
  try {
    return await UsersDaoContainer.deleteById(userId);
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteAllUsers = async () => {
  try {
    return await UsersDaoContainer.deleteAll();
  } catch (error) {
    throw new Error(error);
  }
};
