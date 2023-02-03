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
        return logger.error(
          `Hubo un error al conectar la base de datos ${error}`
        );
      logger.info("Base de datos conectada");
    }
  );
};
