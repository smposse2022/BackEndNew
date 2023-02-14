import express from "express";
import * as ProductController from "../../controllers/productController.js";

// Product Router
const productsRouter = express.Router();

productsRouter.get("/", ProductController.getProductsController);

productsRouter.post("/productos", ProductController.addProductController);

productsRouter.get("/productos/:id", ProductController.getOneProductController);

productsRouter.put("/productos/:id", ProductController.updateProductController);

productsRouter.delete(
  "/productos/:id",
  ProductController.deleteOneProductController
);
export { productsRouter };
