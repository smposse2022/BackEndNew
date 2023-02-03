import { ContenedorDaoMessages } from "../daos/index.js";

export const getMessages = async () => {
  return await ContenedorDaoMessages.getAll();
};

export const addMessage = async (body) => {
  return await ContenedorDaoMessages.save(body);
};

export const deleteAllMessages = async () => {
  return await ContenedorDaoMessages.deleteAll(id);
};
