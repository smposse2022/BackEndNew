import { ContenedorSql } from "../../managers/contenedorSql.js";

class MessagesSQLDao extends ContenedorSql {
  constructor(options, tableName) {
    super(options, tableName);
  }
}

export { MessagesSQLDao };
