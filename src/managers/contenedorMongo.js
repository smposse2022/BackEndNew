import mongoose from "mongoose";
import { logger } from "../logger.js";
import { options } from "../config/databaseConfig.js";

mongoose.set("strictQuery", false);
mongoose.connect(options.mongo.url, (err) => {
  if (err)
    return logger.error(`Hubo un error al conectar la base de datos ${err}`);
  logger.info("Base de datos conectada");
});

class ContenedorMongo {
  constructor(model) {
    this.model = model;
  }
  getAll = async () => {
    try {
      const data = await this.model.find();
      return data;
    } catch (error) {
      logger.error(error);
    }
  };

  save = async (newItem) => {
    try {
      await this.model.create(newItem);
      return `new item saved`;
    } catch (error) {
      logger.error(error);
    }
  };

  getById = async (id) => {
    try {
      const object = await this.model.findById(id);
      if (!object) {
        return {
          message: `Error al buscar: no se encontró el id ${id}`,
          error: true,
        };
      } else {
        return { message: object, error: false };
      }
    } catch (error) {
      return { message: `Hubo un error ${error}`, error: true };
    }
  };

  deleteById = async (id) => {
    try {
      await this.model.findByIdAndDelete(id);
      return { message: "delete successfully" };
    } catch (error) {
      return { message: `Error al borrar: no se encontró el id ${id}` };
    }
  };

  deleteAll = async () => {
    try {
      await this.model.deleteMany({});
      return { message: "delete successfully" };
    } catch (error) {
      logger.error(error);
    }
  };

  updateById = async (id, title) => {
    // no debería modificar sólo el título, ver de hacerlo con body
    try {
      await this.model.findByIdAndUpdate(id, body, { new: true });
      return { message: "Update successfully" };
    } catch (error) {
      return { message: `Error al actualizar: no se encontró el id ${id}` };
    }
  };
}

export { ContenedorMongo };
