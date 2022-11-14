const express = require("express");
const ContenedorSql = require("../managers/contenedorSql");
const options = require("../options/mySqulConfig");

const router = express.Router();

const listaProductos = new ContenedorSql(options.mariDb, "products");

router.get("/", async (req, res) => {
  const productos = await listaProductos.getAll();
  res.send(productos);
});

router.get("/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await listaProductos.getById(parseInt(productId));
  if (product) {
    return res.send(product);
  } else {
    return res.send({ error: "producto no encontrado" });
  }
});

router.post("/", async (req, res) => {
  const newProduct = req.body;
  const result = await listaProductos.save(newProduct);
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const cambioObj = req.body;
  const productId = req.params.id;
  const result = await listaProductos.updateById(
    parseInt(productId),
    cambioObj
  );
  res.send(result);
});

router.delete("/:id", async (req, res) => {
  const productId = req.params.id;
  const result = await listaProductos.deleteById(parseInt(productId));
  res.send(result);
});

module.exports = { productsRouter: router };
