const express = require("express");
const Contenedor = require("../managers/products");
const productsRouter = express.Router();

const listaProductos = new Contenedor("Productos.txt");

// Ruta Handlebar - GET
productsRouter.get("/", (req, res) => {
  try {
    res.render("home");
  } catch (error) {
    res.status(500).send("Hubo un error en el servidor");
  }
});

productsRouter.get("/productos", async (req, res) => {
  try {
    res.render("productos", { products: await listaProductos.getAll() });
    res.json({
      message: "productos encontrados",
      response: products,
    });
  } catch (error) {
    res.status(500).send("Hubo un error en el servidor");
  }
});

productsRouter.get("/productos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.render("productos", {
      product: await listaProductos.getById(parseInt(id)),
    });
    res.json({
      message: "producto encontrado",
      response: product,
    });
  } catch (error) {
    res.status(500).send("Hubo un error en el servidor");
  }
});

// Ruta Handlebar - POST
productsRouter.post("/productos", async (req, res) => {
  try {
    const newProduct = req.body;
    const productos = await listaProductos.save(newProduct);
    res.redirect("/api/productos");
    res.json({
      message: "productos más el nuevo",
      response: productos,
    });
  } catch (error) {
    res.status(500).send("Hubo un error en el servidor");
  }
});

// Ruta Handlebar - PUT
productsRouter.put("/productos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const modification = req.body;
    const productosActualizados = await listaProductos.updateById(
      parseInt(id),
      modification
    );
    res.render("productos");
    res.json({
      message: `el producto con el id ${id} fue actualizado`,
      response: productosActualizados,
    });
  } catch (error) {
    res.status(500).send("Hubo un error en el servidor");
  }
});

// Ruta Handlebar - DELETE
productsRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productosSinElBorrado = await listaProductos.filter(
      (el) => el.id === parseInt(id)
    );
    res.render("productos");
    res.json({
      message: `el producto con el id ${id} fue eliminado`,
      response: productosSinElBorrado,
    });
  } catch (error) {
    res.status(500).send("Hubo un error en el servidor");
  }
});

module.exports = productsRouter;
