const options = require("../options/mySqulConfig");
const knex = require("knex");

const database = knex(options);

class ContenedorWebsocketSqlite {
  Constructor(options, tableName) {
    this.database = knex(options);
    this.table = tableName;
  }
  save = async (obj) => {
    await database("messages")
      .insert(obj)
      .then(() => console.log("Data agregada"))
      .catch((err) => console.log(err))
      .finally(() => database.destroy());
  };
}
getAll = async () => {
  const result = await this.database("messages").select("*");
  const messages = result.map((elm) => ({ ...elm }));
  return messages;
};

module.exports = ContenedorWebsocketSqlite;
