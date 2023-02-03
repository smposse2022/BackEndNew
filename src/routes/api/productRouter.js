import express from "express";
//import { chatWebsocket } from "../../server.js";
import { ContenedorDaoProductos } from "../../daos/index.js";
import { checkAdminRole } from "../../middlewares/isAdmin.js";
import { checkLogin } from "../../middlewares/checkLogin.js";
import { options } from "../../config/options.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local"; //estrategia para autenticar por correo y password.
import { UserModel } from "../../dbOperations/models/user.models.js";
import bcrypt from "bcrypt"; //encriptar las contrase;as
import compression from "compression";
import { logger } from "../../logger.js";
import * as ProductController from "../../controllers/products.controller.js";

// Product Router
const productsRouter = express.Router();

// Ruta contar numeros No bloqueante
// ?cant=x     - Query param
productsRouter.get("/randoms", ProductController.contarNoBloq);

productsRouter.post(
  "/generar-productos",
  ProductController.generarRandomsController
);

// Ruta info - process
productsRouter.get("/info", ProductController.getInfoController);

// Ruta info Compression
productsRouter.get(
  "/infoCompression",
  compression(),
  ProductController.getInfoController
);

productsRouter.get("/productos/:id", ProductController.getProductController);

productsRouter.put("/productos/:id", ProductController.updateController);

productsRouter.delete("/productos/:id", ProductController.deleteProdController);

productsRouter.get("*", (req, res) => {
  logger.warn("Se intentó acceder a una ruta inexistente");
  res.redirect("/");
});

//comandos
// curl -X GET "http://localhost:8080/xxx"

//profiling commands
// node --prof server.js

//artillery quick --count 20 -n 50 http://localhost:8080/info > result_info.txt

//compilacion de archivos isolate
// node --prof-process isolate-info.log > result_prof_info.txt

export { productsRouter };
