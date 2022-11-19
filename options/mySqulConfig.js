import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const options = {
  fileSystem: {
    pathProducts: "Productos.json",
    pathCarts: "Carritos.json",
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
  */ sqliteDb: {
    client: "sqlite3",
    connection: {
      filename: path.join(__dirname, "../db/database.sqlite"),
    },
    useNullAsDefault: true,
  },
  /*firebase: {
    serviceKey: {},
    databaseUrl: "",
  },*/
};
