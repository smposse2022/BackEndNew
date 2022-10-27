const express = require("express");
const Contenedor = require("../managers/products");
const productsRouter = express.Router();

const listaProductos = new Contenedor("./files/Products.txt");

// GET
/*productsRouter.get("/", async (req, res) => {
  try {
    const productos = await listaProductos.getAll();
    res.json({
      message: "productos encontrados",
      product: productos,
    });
  } catch (error) {
    res.status(500).send("Hubo un error en el servidor");
  }
});*/

// Ruta Handlebar - GET
productsRouter.get("/", (req, res) => {
  try {
    res.render("home");
  } catch (error) {
    res.status(500).send("Hubo un error en el servidor");
  }
});
productsRouter.get("/products", async (req, res) => {
  try {
    res.render("productos", { products: await listaProductos.getAll() });
  } catch (error) {
    res.status(500).send("Hubo un error en el servidor");
  }
});
// Ruta Handlebar - POST
productsRouter.post("/products", async (req, res) => {
  try {
    await listaProductos.save(req.body);
    res.redirect("/api/products");
  } catch (error) {
    res.status(500).send("Hubo un error en el servidor");
  }
});

productsRouter.get("/:id", async (req, res) => {
  const { id } = req.params; // Todo lo que se reciba en params será de tipo string
  const product = await listaProductos.getById(parseInt(id));
  if (product) {
    res.json({
      message: "producto encontrado",
      product: product,
    });
  } else {
    res.json({
      message: "producto no encontrado",
    });
  }
});

/*productsRouter.get("/productoRandom", async (request, response) => {
  const resultadoId = await listaProductos.getById(
    Math.floor(Math.random() * listaProductos.length)
  );
  response.send(resultadoId);
});*/

// POST
productsRouter.post("/", async (req, res) => {
  const newProduct = req.body;
  console.log(req.body);
  const productos = await listaProductos.save(newProduct);
  try {
    res.json({
      message: "producto creado",
      response: productos,
    });
  } catch (error) {
    res.status(500).send("Hubo un error en el servidor");
  }
});

// PUT
productsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const modification = req.body;
  const productosActualizados = await listaProductos.updateById(
    parseInt(id),
    modification
  );
  res.json({
    message: `el producto con el id ${id} fue actualizado`,
    response: productosActualizados,
  });
});

// DELETE
productsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const productosSinElBorrado = await listaProductos.filter(
    (el) => el.id === parseInt(id)
  );
  res.json({
    message: `el producto con el id ${id} fue eliminado`,
    response: productosSinElBorrado,
  });
});

module.exports = productsRouter;
