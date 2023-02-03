import { ContenedorDaoCarritos } from "../daos/index.js";

export const getCarts = async () => {
  return await ContenedorDaoCarritos.getAll();
};

export const addProductToCart = async (body) => {
  return await ContenedorDaoCarritos.save(body);
};

export const updateCart = async (body, id) => {
  return await ContenedorDaoCarritos.updateById(body, id);
};

export const getCart = async (id) => {
  return await ContenedorDaoCarritos.getById(id);
};

export const deleteCart = async (id) => {
  return await ContenedorDaoCarritos.deleteById(id);
};

export const deleteAllCarts = async () => {
  return await ContenedorDaoCarritos.deleteAll(id);
};
