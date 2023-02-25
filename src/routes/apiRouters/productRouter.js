import express from "express";
import * as ProductController from "../../controllers/productController.js";

// Product Router
const productsRouter = express.Router();

productsRouter.get("/", ProductController.getProductsController);

productsRouter.post("/", ProductController.addProductController);

productsRouter.get("/:id", ProductController.getOneProductController);

productsRouter.put("/:id", ProductController.updateProductController);

productsRouter.delete("/:id", ProductController.deleteOneProductController);

productsRouter.delete("/", ProductController.deleteAllProductsController);

export { productsRouter };
