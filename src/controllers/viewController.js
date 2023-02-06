import { logger } from "../logger.js";

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
export const getMeHomeController = async (req, res) => {
  try {
    if (req.session.passport) {
      logger.info("Acceso a ruta home con usuario registrado");
      res.render("home", { user: req.user.nombre });
    } else {
      logger.info("Acceso a ruta home sin usuario registrado");
      res.render("home", { user: "Invitado" });
    }
  } catch (error) {
    logger.error(`Error al cargar la página de inicio ${error}`);
  }
};
