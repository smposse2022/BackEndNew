import * as dotenv from "dotenv";

const envFile =
  process.env.NODE_ENV === "dev" ? ".env.development" : ".env.production";

dotenv.config({
  path: (process.env.NODE_ENV = ".env"),
}); //asigna las variables del archivo .env a process.env {PORT:"",MODO:""}

//creamos la configuracion de nuestra aplicacion
export const config = {
  PORT: process.env.PORT || 8082,
  MONGO_URL: process.env.MONGO_URL,
  MONGO_URL_SESSIONS: process.env.MONGO_URL_SESSIONS,
  MONGO_SESSIONS_CLAVE_SECRETA: process.env.MONGO_SESSIONS_CLAVE_SECRETA,
};
