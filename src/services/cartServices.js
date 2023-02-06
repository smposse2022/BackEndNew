import { CartManager } from "../dbOperations/index.js";

export const getCarts = async () => {
  return CartManager.getAll();
};

export const addCart = async (body) => {
  return await CartManager.save(body);
};

export const getOneCart = async (id) => {
  return await CartManager.getById(id);
};

export const updateCart = async (body, id) => {
  return await CartManager.updateById(body, id);
};

export const deleteCart = async (id) => {
  return await CartManager.deleteById(id);
};
