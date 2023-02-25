// Fabrica
import { UserModel } from "./models/userModel.js";
import { CartModel } from "./models/cartModel.js";
import { MessagesModel } from "./models/messagesModel.js";
import { ProductModel } from "./models/productModel.js";
import { options } from "../config/options.js";
import { MyMongoClient } from "./clients/dbClientMongo.js";

export async function getApiDao(DBTYPE) {
  let CartDaoContainer;
  let MessagesDaoContainer;
  let ProductsDaoContainer;
  let UsersDaoContainer;

  switch (DBTYPE) {
    case "archivos":
      const { CartArchivosDao } = await import(
        "./daos/carts/cartArchivosDao.js"
      );
      const { MessagesArchivosDao } = await import(
        "./daos/messages/messagesArchivosDao.js"
      );
      const { ProductsArchivosDao } = await import(
        "./daos/products/productsArchivosDao.js"
      );
      const { UserArchivosDao } = await import(
        "./daos/users/userArchivosDao.js"
      );
      CartDaoContainer = new CartArchivosDao("carritos");
      MessagesDaoContainer = new MessagesArchivosDao("archivos");
      ProductsDaoContainer = new ProductsArchivosDao("productos");
      UsersDaoContainer = new UserArchivosDao("usuarios");
      break;
    case "sql":
      const { CartSqlDao } = await import("./daos/carts/cartSqlDao.js");
      const { MessagesSqlDao } = await import(
        "./daos/messages/messagesSqlDao.js"
      );
      const { ProductsSqlDao } = await import(
        "./daos/products/productsSqlDao.js"
      );
      const { UserSqlDao } = await import("./daos/users/userSqlDao.js");
      // Conectamos a la base de datos de MySql
      CartDaoContainer = new CartSqlDao(options.sqliteDb, "carritos");
      MessagesDaoContainer = new MessagesSqlDao(options.sqliteDb, "messages");
      ProductsDaoContainer = new ProductsSqlDao(options.sqliteDb, "productos");
      UsersDaoContainer = new UserSqlDao(options.sqliteDb, "usuarios");
      break;
    case "mongo":
      const { CartMongoDao } = await import("./daos/carts/cartMongoDao.js");
      const { MessagesMongoDao } = await import(
        "./daos/messages/messagesMongoDao.js"
      );
      const { ProductsMongoDao } = await import(
        "./daos/products/productsMongoDao.js"
      );
      const { UserMongoDao } = await import("./daos/users/userMongoDao.js");
      // Conectamos a la base de datos de mongoDb
      const client = new MyMongoClient();
      await client.connect();
      CartDaoContainer = new CartMongoDao(CartModel);
      MessagesDaoContainer = new MessagesMongoDao(MessagesModel);
      ProductsDaoContainer = new ProductsMongoDao(ProductModel);
      UsersDaoContainer = new UserMongoDao(UserModel);
      break;
  }
  return {
    CartDaoContainer,
    MessagesDaoContainer,
    ProductsDaoContainer,
    UsersDaoContainer,
  };
}
