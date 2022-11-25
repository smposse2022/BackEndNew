import { options } from "../options/mySqulConfig.js";
import { productModel } from "../mongo/models/productModel.js";
import { cartModel } from "../mongo/models/cartModel.js";
import mongoose from "mongoose";

// generar llave para poder conectarnos de manera segura a nuestra app de Firebase
// Vinculamos esa clave con nuestro serv principal

let ContenedorDaoProductos;
let ContenedorDaoCarritos;

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
    // la url donde se está ejecutando mi base de datos
    const URL = "mongodb://127.0.0.1:27017/segundaPreEntrega";
    // conectamos la base de datos
    mongoose.connect(
      URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (error) => {
        if (error) throw new Error(`Conexion fallida ${error}`);
        console.log("conexion base de datos exitosa!");
      }
    );
    const { ProductsDaoMongo } = await import("./products/productsMongo.js");
    const { CartDaoMongo } = await import("./carts/cartMongo.js");
    ContenedorDaoProductos = new ProductsDaoMongo(productModel);
    ContenedorDaoCarritos = new CartDaoMongo(cartModel);
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

export { ContenedorDaoProductos, ContenedorDaoCarritos };
