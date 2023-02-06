import { Router } from "express";
import { logger } from "../../logger.js";
import * as ViewController from "../../controllers/viewController.js";
import compression from "compression";

const viewsRouter = Router();

viewsRouter.get("/", ViewController.getMeHomeController);

// Ruta info - process
viewsRouter.get("/info", ViewController.getInfoController);

// Ruta info Compression
viewsRouter.get(
  "/infoCompression",
  compression(),
  ViewController.getInfoController
);

viewsRouter.get("/carrito", (req, res) => {
  //add code to cart view
});

export { viewsRouter };
