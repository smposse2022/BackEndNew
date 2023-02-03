import { Router } from "express";
import { logger } from "../../logger.js";
import * as ProductController from "../../controllers/products.controller.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res) => {
  if (req.session.passport) {
    logger.info("Acceso a ruta home con usuario registrado");
    res.render("home", { user: req.user.nombre });
  } else {
    logger.info("Acceso a ruta home sin usuario registrado");
    res.render("home", { user: "Invitado" });
  }
});

viewsRouter.get("/productos", ProductController.getProductsController);

viewsRouter.get("/carrito", (req, res) => {
  //add code to cart view
});

export { viewsRouter };
