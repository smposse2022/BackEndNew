import { getApiDao } from "../dbOperations/index.js";
import { options } from "../config/options.js";

const { ProductsDaoContainer } = await getApiDao(options.server.DBTYPE);

export const getProducts = async () => {
  try {
    return await ProductsDaoContainer.getAll();
  } catch (error) {
    throw new Error(error);
  }
};

export const addProduct = async (body) => {
  try {
    return await ProductsDaoContainer.save(body);
  } catch (error) {
    throw new Error(error);
  }
};

export const getOneProduct = async (id) => {
  try {
    return await ProductsDaoContainer.getById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const updateProduct = async (body, id) => {
  try {
    return await ProductsDaoContainer.updateById(body, id);
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    return await ProductsDaoContainer.deleteById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteAllProducts = async () => {
  try {
    return await ProductsDaoContainer.deleteAll();
  } catch (error) {
    throw new Error(error);
  }
};
