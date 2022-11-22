import path from "path";

const options = {
  mariaDb: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "desafiosql",
    },
  },
  sqliteDb: {
    client: "sqlite3",
    connection: {
      filename: path.join("../db/database.sqlite"),
    },
  },
};
export { options };
