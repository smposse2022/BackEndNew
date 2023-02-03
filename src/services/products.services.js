import { ContenedorDaoProductos } from "../daos/index.js";

export const getProducts = async () => {
  return await ContenedorDaoProductos.getAll();
};

export const addProduct = async (body) => {
  return await ContenedorDaoProductos.save(body);
};

export const updateProduct = async (body, id) => {
  return await ContenedorDaoProductos.updateById(body, id);
};

export const getOneProduct = async (id) => {
  return await ContenedorDaoProductos.getById(id);
};

export const deleteProduct = async (id) => {
  return await ContenedorDaoProductos.deleteById(id);
};

export const deleteAllProducts = async () => {
  return await ContenedorDaoProductos.deleteAll(id);
};
