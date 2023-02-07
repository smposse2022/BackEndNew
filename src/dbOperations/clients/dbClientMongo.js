import mongoose from "mongoose";
import { options } from "../../config/options.js";
import { logger } from "../../logger.js";

// clase para conectarme a la base de datos

class MyMongoClient {
  constructor() {
    this.client = mongoose;
  }
  // metodos para conectarme a la base de datos
  async connect() {
    try {
      this.client.set("strictQuery", false);
      await this.client.connect(options.mongo.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      logger.info(`Conexión a la base de datos exitosa`);
    } catch (error) {
      logger.error(`Se produjo el error ${error}`);
    }
  }

  async disconnect() {
    try {
      await this.client.connection.close();
      logger.info(`Base de datos desconectada`);
    } catch (error) {
      logger.error(`Se produjo el error ${error}`);
    }
  }
}

export { MyMongoClient };
