const path = require("path");
const options = {
  mariDb: {
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
      filename: path.join(__dirname, "../db/database.sqlite"),
    },
  },
};
module.exports = options;
