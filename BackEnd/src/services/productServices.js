import { getApiDao } from "../dbOperations/index.js";
import { options } from "../config/options.js";

const { ProductsDaoContainer } = await getApiDao(options.server.DBTYPE);

export const getProducts = async () => {
  return await ProductsDaoContainer.getAll();
};

export const addProduct = async (body) => {
  return await ProductsDaoContainer.save(body);
};

export const getOneProduct = async (id) => {
  return await ProductsDaoContainer.getById(id);
};

export const updateProduct = async (body, id) => {
  return await ProductsDaoContainer.updateById(body, id);
};

export const deleteProduct = async (id) => {
  return await ProductManager.deleteById(id);
};
