import { getApiDao } from "../dbOperations/index.js";
import { options } from "../config/options.js";

const { UsersDaoContainer, ProductsDaoContainer, CartDaoContainer } =
  await getApiDao(options.server.DBTYPE);

export const root = {
  getUsers: async () => {
    return await UsersDaoContainer.getAll();
  },
  saveUser: async (body) => {
    return await UsersDaoContainer.save(body);
  },
  deleteUser: async (userId) => {
    return await UsersDaoContainer.deleteById(userId);
  },
  deleteAllUsers: async () => {
    return await UsersDaoContainer.deleteAll();
  },
  getProducts: async () => {
    return await ProductsDaoContainer.getAll();
  },
  addProduct: async (body) => {
    return await ProductsDaoContainer.save(body);
  },
  getOneProduct: async (id) => {
    return await ProductsDaoContainer.getById(id);
  },
  updateProduct: async (body, id) => {
    return await ProductsDaoContainer.updateById(body, id);
  },
  deleteProduct: async (id) => {
    return await ProductsDaoContainer.deleteById(id);
  },
  deleteAllProducts: async () => {
    return await ProductsDaoContainer.deleteAll();
  },
  getCarts: async () => {
    return CartDaoContainer.getAll();
  },
  addCart: async (body) => {
    return await CartDaoContainer.save(body);
  },
  getOneCart: async (id) => {
    return await CartDaoContainer.getById(id);
  },
  updateCart: async (body, id) => {
    return await CartDaoContainer.updateById(body, id);
  },
  deleteCart: async (id) => {
    return await CartDaoContainer.deleteById(id);
  },
};
