import mongoose from "mongoose";
import { options } from "./options.js";
import { logger } from "../logger.js";

export const connectDB = () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(
    options.mongo.url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (error) => {
      if (error)
        return logger.error(`Hubo un error conectandose a la base ${error}`);
      logger.info("conexion a la base de datos de manera exitosa");
    }
  );
};
