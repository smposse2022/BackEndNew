import dotenv from "dotenv";

dotenv.config();

//creamos la configuracion de nuestra aplicacion
export const config = {
  MONGO_URL: process.env.MONGO_URL,
  MONGO_URL_SESSIONS: process.env.MONGO_URL_SESSIONS,
  MONGO_SESSIONS_CLAVE_SECRETA: process.env.MONGO_SESSIONS_CLAVE_SECRETA,
  MAIL_ADMIN: process.env.MAIL_ADMIN,
};
