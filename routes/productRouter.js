import express from "express";
import { checkAdminRole } from "../middlewares/isAdmin.js";
import { options } from "../options/mySqulConfig.js";
import { ContenedorArchivos } from "../managers/contenedorArchivos.js";
import { ContenedorSql } from "../managers/ContenedorSql.js";
import { ContenedorDaoProductos } from "../daos/index.js";

// products router
const productsRouter = express.Router();

//products manager
// const listaProductos = new ContenedorArchivos (options.fileSystem.pathProducts);
// const listaProductos = new ContenedorMysql(options.sqliteDB, "productos");
export const listaProductos = ContenedorDaoProductos;

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

productsRouter.post("/", checkAdminRole, async (req, res) => {
  const newProduct = req.body;
  const result = await listaProductos.save(newProduct);
  res.send(result);
});

productsRouter.put("/:id", checkAdminRole, async (req, res) => {
  //const cambioObj = req.body;
  const productId = req.params.id;
  const result = await listaProductos.updateById(parseInt(productId));
  res.send(result);
});

productsRouter.delete("/:id", checkAdminRole, async (req, res) => {
  const productId = req.params.id;
  const result = await listaProductos.deleteById(parseInt(productId));
  res.send(result);
});

export { productsRouter };
