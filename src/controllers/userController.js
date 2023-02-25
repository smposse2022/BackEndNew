import { logger } from "../logger.js";
import {
  getUsers,
  saveUser,
  deleteUser,
  deleteAllUsers,
} from "../services/userServices.js";

export const getUsersController = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json({ Usuarios: users });
  } catch (error) {
    logger.error(`Error al buscar los usuarios ${error}`);
    res.status(400).json({ message: `Hubo un error ${error}` });
  }
};

export const saveUserController = async (req, res) => {
  try {
    const user = await saveUser(req.body);
    res.status(200).json({ NewUser: user });
  } catch (error) {
    logger.error(`Error al guardar un usuario ${error}`);
    res.status(400).json({ message: `Hubo un error ${error}` });
  }
};

export const deleteUserController = async (req, res) => {
  const userId = req.params.id;
  try {
    const response = await deleteUser(userId);
    res.status(200).json({ message: response });
  } catch (error) {
    logger.error(`Error al borrar un usuario ${error}`);
    res.status(400).json({ message: `Hubo un error ${error}` });
  }
};

export const deleteAllUsersController = async (req, res) => {
  try {
    const response = await deleteAllUsers();
    res.status(200).json({ message: response });
  } catch (error) {
    res.status(400).json({ message: `Hubo un error ${error}` });
  }
};

export const getInfoController = async (req, res) => {
  try {
    const info = {
      argumentosDeEntrada: process.cwd(),
      plataforma: process.platform,
      nodeVersion: process.version,
      memory: process.memoryUsage(),
      path: process.argv[0],
      id: process.pid,
      carpeta: process.argv[1],
    };
    logger.info(info);
    res.status(200).json(info);
  } catch (error) {
    logger.error(`Error al leer la ruta de info ${error}`);
  }
};
