import { ContenedorDaoUsers } from "../daos/index.js";

export const getUsers = async () => {
  return await ContenedorDaoUsers.getAll();
};

export const addUser = async (body) => {
  return await ContenedorDaoUsers.save(body);
};

export const updateUser = async (body, id) => {
  return await ContenedorDaoUsers.updateById(body, id);
};

export const getOneUser = async (id) => {
  return await ContenedorDaoUsers.getById(id);
};

export const deleteUser = async (id) => {
  return await ContenedorDaoUsers.deleteById(id);
};

export const deleteAllUsers = async () => {
  return await ContenedorDaoUsers.deleteAll(id);
};
