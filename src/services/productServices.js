import { ProductManager } from "../dbOperations/index.js";

export const getProducts = async () => {
  return await ProductManager.getAll();
};

export const addProduct = async (body) => {
  return await ProductManager.save(body);
};

export const getOneProduct = async (id) => {
  return await ProductManager.getById(id);
};

export const updateProduct = async (body, id) => {
  return await ProductManager.updateById(body, id);
};

export const deleteProduct = async (id) => {
  return await ProductManager.deleteById(id);
};
