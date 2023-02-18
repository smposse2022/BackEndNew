import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import ParsedArgs from "minimist";
// Minimist
const optionsMinimist = {
  default: { p: 8080, m: "FORK", env: "DEV" },
  alias: { p: "PORT", m: "MODE", e: "ENV" },
};
export const objArguments = ParsedArgs(process.argv.slice(2), optionsMinimist);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

export const options = {
  server: {
    PORT: objArguments.PORT,
    MODE: objArguments.MODE,
    DBTYPE: process.env.DBTYPE || "mongo",
  },
  mongo: {
    url: "mongodb+srv://smposse:coderMongo2022@cluster0.94d5car.mongodb.net/ecommerceDB?retryWrites=true&w=majority",
    urlTesting:
      "mongodb+srv://smposse:coderMongo2022@cluster0.94d5car.mongodb.net/testingDB?retryWrites=true&w=majority",
  },
  sqliteDb: {
    client: "sqlite3",
    connection: {
      filename: path.join(__dirname, "../db/database.sqlite"),
    },
    useNullAsDefault: true,
  },

  /*mariaDb: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "desafiosql",
    },
  },
  fileSystem: {
    pathProducts: "Products.json",
    pathCarts: "Carritos.json",
    pathMessages: "Messages.json",
  },
  sqliteDb: {
    client: "sqlite3",
    connection: {
      filename: path.join(__dirname, "../db/database.sqlite"),
    },
    useNullAsDefault: true,
  },*/
  /*firebase: {
    pathProducts: productCollection,
    pathCarts: cartCollection,
  },*/
};
