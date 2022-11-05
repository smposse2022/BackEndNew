const express = require("express");
const Contenedor = require("../managers/products");
const ContenedorCarritos = require("../managers/carritos");
const productsRouter = express.Router();

const listaProductos = new Contenedor("Products.txt");
const contenedorCarritos = new ContenedorCarritos("Carritos.txt");

// Validaciones
const isAdminBoolean = true;
function isAdmin(req, res, next) {
  if (isAdminBoolean) {
    next();
  } else {
    res.status(403).send(`Error, ruta ${req.url} no autorizada`);
  }
}

// Ruta Handlebar - GET
productsRouter.get("/", (req, res) => {
  try {
    res.render("home");
  } catch (error) {
    res.status(500).send("Hubo un error en el servidor");
  }
});

// Rutas Productos
productsRouter.get("/productos", async (req, res) => {
  try {
    const products = await listaProductos.getAll();
    res.render("productos", { products: products });
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
    const product = await listaProductos.getById(parseInt(id));
    res.render("productos", {
      product: product,
    });
    res.json({
      message: "producto encontrado",
      response: product,
    });
  } catch (error) {
    res.status(500).send("Hubo un error en el servidor");
  }
});

// Ruta - POST (sólo para administradores)
productsRouter.post("/productos", isAdmin, async (req, res) => {
  try {
    const newProduct = req.body;
    const productos = await listaProductos.save(newProduct);
    res
      .json({
        message: "productos más el nuevo",
        response: productos,
      })
      .redirect("/api/productos");
  } catch (error) {
    res.status(500).send("Hubo un error en el servidor");
  }
});

// Ruta - PUT (sólo para administradores)
productsRouter.put("/productos/:id", isAdmin, async (req, res) => {
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

// Ruta - DELETE (sólo para administradores)
productsRouter.delete("/:id", isAdmin, async (req, res) => {
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

// Rutas Carrito

// Ruta - POST - crea un carrito y lo muestra
productsRouter.post("/carrito", async (req, res) => {
  try {
    const newCarrito = req.body;
    const carritos = await contenedorCarritos.save(newCarrito);
    res.json({
      message: "carrito creado",
      response: newCarrito,
    });
  } catch (error) {
    res.status(500).send("Hubo un error en el servidor");
  }
});

// Ruta - DELETE
productsRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const carritosSinElBorrado = await contenedorCarritos.filter(
      (el) => el.id === parseInt(id)
    );
    res.json({
      message: `el carrito con el id ${id} fue eliminado`,
      response: carritosSinElBorrado,
    });
  } catch (error) {
    res.status(500).send("Hubo un error en el servidor");
  }
});

module.exports = productsRouter;
