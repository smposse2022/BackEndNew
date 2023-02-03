import { options } from "../config/options.js";
import { ProductModel } from "../dbOperations/models/product.models.js";
import { CartModel } from "../dbOperations/models/cart.models.js";
import { MessagesModel } from "../dbOperations/models/messages.models.js";
import { UserModel } from "../dbOperations/models/user.models.js";

// generar llave para poder conectarnos de manera segura a nuestra app de Firebase
// Vinculamos esa clave con nuestro serv principal

let ContenedorDaoProductos;
let ContenedorDaoCarritos;
let ContenedorDaoMessages;
let ContenedorDaoUsers;

//identificador
let databaseType = "mongo";

switch (databaseType) {
  case "archivos":
    const { ProductsDaoArchivos } = await import("./products/productsFiles.js");
    const { CartsDaoArchivos } = await import("./carts/cartsFiles.js");
    ContenedorDaoProductos = new ProductsDaoArchivos(
      options.fileSystem.pathProducts
    );
    ContenedorDaoCarritos = new CartsDaoArchivos(options.fileSystem.pathCarts);
    break;
  case "sql":
    const { ProductosDaoSQL } = await import("./products/productsSql.js");
    const { CarritosDaoSQL } = await import("./carts/cartSql.js");
    ContenedorDaoProductos = new ProductosDaoSQL(options.sqliteDb, "productos");
    ContenedorDaoCarritos = new CarritosDaoSQL(options.sqliteDb, "carritos");
    break;
  case "mongo":
    const { ProductsDaoMongo } = await import("./products/productsMongo.js");
    const { CartDaoMongo } = await import("./carts/cartMongo.js");
    const { MessagesDaoMongo } = await import("./messages/messagesMongo.js");
    const { UsersDaoMongo } = await import("./users/usersMongo.js");
    ContenedorDaoProductos = new ProductsDaoMongo(ProductModel);
    ContenedorDaoCarritos = new CartDaoMongo(CartModel);
    ContenedorDaoMessages = new MessagesDaoMongo(MessagesModel);
    ContenedorDaoUsers = new UsersDaoMongo(UserModel);
    break;
  /*case "firebase":
    const { ProductsDaoFirebase } = await import(
      "./products/productsFirebase.js"
    );
    const { CartDaoFirebase } = await import("./carts/cartsFirebase.js");
    ContenedorDaoProductos = new ProductsDaoFirebase("Productos");
    ContenedorDaoCarritos = new CartDaoFirebase("Carritos");
    break;*/
}

export {
  ContenedorDaoProductos,
  ContenedorDaoCarritos,
  ContenedorDaoMessages,
  ContenedorDaoUsers,
};
