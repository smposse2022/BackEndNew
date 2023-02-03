import express from "express";
import { authRouter } from "./api/authRouter.js";
import { cartsRouter } from "./api/cartsRouter.js";
import { productsRouter } from "./api/productRouter.js";
import { viewsRouter } from "./api/viewsRouter.js";

const router = express.Router();

router.use("/", viewsRouter);
router.use("/productos", productsRouter);
router.use("/auth", authRouter);
router.use("/carritos", cartsRouter);

export { router as apiRouter };
