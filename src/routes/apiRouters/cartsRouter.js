import express from "express";
import * as CartsController from "../../controllers/cartController.js";

//router carritos
const cartsRouter = express.Router();

cartsRouter.get("/", CartsController.getCartsController);

cartsRouter.post("/", CartsController.createCartController);

cartsRouter.delete("/:id", CartsController.deleteCartController);

cartsRouter.get("/:id/productos", CartsController.getProductsofCartController);

cartsRouter.post("/:id/productos", CartsController.addProductToCartController);

cartsRouter.delete(
  "/:id/productos/:idProd",
  CartsController.deleteProdFormCartController
);

export { cartsRouter };
