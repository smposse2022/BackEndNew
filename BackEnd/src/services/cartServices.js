import { getApiDao } from "../dbOperations/index.js";
import { options } from "../config/options.js";

const { CartDaoContainer } = await getApiDao(options.server.DBTYPE);

export const getCarts = async () => {
  return CartDaoContainer.getAll();
};

export const addCart = async (body) => {
  return await CartDaoContainer.save(body);
};

export const getOneCart = async (id) => {
  return await CartDaoContainer.getById(id);
};

export const updateCart = async (body, id) => {
  return await CartDaoContainer.updateById(body, id);
};

export const deleteCart = async (id) => {
  return await CartDaoContainer.deleteById(id);
};
