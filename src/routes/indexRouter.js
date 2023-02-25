import express from "express";
import { authRouter } from "./apiRouters/authRouter.js";
import { productsRouter } from "./apiRouters/productRouter.js";
import { cartsRouter } from "./apiRouters/cartsRouter.js";

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/productos", productsRouter);
apiRouter.use("/carritos", cartsRouter);

export { apiRouter };
