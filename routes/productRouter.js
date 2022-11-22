import express from "express";
import { ContenedorSql } from "../managers/contenedorSql.js";
import { options } from "../options/mySqulConfig.js";

const productsRouter = express.Router();

const listaProductos = new ContenedorSql(options.mariaDb, "products");

productsRouter.get("/", async (req, res) => {
  const productos = await listaProductos.getAll();
  res.send(productos);
});

productsRouter.get("/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await listaProductos.getById(parseInt(productId));
  if (product) {
    return res.send(product);
  } else {
    return res.send({ error: "producto no encontrado" });
  }
});

productsRouter.post("/", async (req, res) => {
  const newProduct = req.body;
  const result = await listaProductos.save(newProduct);
  res.send(result);
});

productsRouter.put("/:id", async (req, res) => {
  const cambioObj = req.body;
  const productId = req.params.id;
  const result = await listaProductos.updateById(
    parseInt(productId),
    cambioObj
  );
  res.send(result);
});

productsRouter.delete("/:id", async (req, res) => {
  const productId = req.params.id;
  const result = await listaProductos.deleteById(parseInt(productId));
  res.send(result);
});

export { productsRouter };
