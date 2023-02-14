import { ContenedorSql } from "../../managers/contenedorSql.js";

class CartSQLDao extends ContenedorSql {
  constructor(options, tableName) {
    super(options, tableName);
  }
}

export { CartSQLDao };
