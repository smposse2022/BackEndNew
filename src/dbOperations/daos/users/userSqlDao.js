import { ContenedorSql } from "../../managers/contenedorSql.js";

class UserSQLDao extends ContenedorSql {
  constructor(options, tableName) {
    super(options, tableName);
  }
}

export { UserSQLDao };
