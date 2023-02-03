import express from "express";
import { checkAdminRole } from "../../middlewares/isAdmin.js";
import { options } from "../../config/options.js";
//import { ContenedorArchivos } from "../managers/contenedorArchivos.js";
//import { ContenedorSql } from "../managers/ContenedorSql.js";
import * as CartController from "../../controllers/carts.controller.js";

//manager carritos
// const listaProductos = new ContenedorArchivos (options.fileSystem.pathProducts);
// const listaCarritos = new ContenedorArchivos (options.fileSystem.pathCarts);
// const listaProductos = new ContenedorSql(options.sqliteDB, "productos");
// const listaCarritos = new ContenedorSql(options.sqliteDB, "carritos");

//router carritos
const cartsRouter = express.Router();

cartsRouter.get("/", CartController.getCartsController);

cartsRouter.post("/", CartController.addProdToCartController);

cartsRouter.delete("/:id", CartController.deleteCartController);

cartsRouter.get("/:id/productos", CartController.getProdFromCartController);

cartsRouter.post("/:id/productos", CartController.addProdToCartOneController);

cartsRouter.delete(
  "/:id/productos/:idProd",
  CartController.deleteProdFromCartController
);

export { cartsRouter };
