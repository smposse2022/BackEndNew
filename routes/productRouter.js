import express from "express";
import { ContenedorSql } from "../managers/contenedorSql.js";
import { options } from "../options/mySqulConfig.js";
import { ProductsMock } from "../moks/products.js";

const productsRouter = express.Router();

const listaProductos = new ContenedorSql(options.mariaDb, "products");
const productsRandom = new ProductsMock();

const checkUserLogged = (req, res, next) => {
  if (req.session.username) {
    next();
  } else {
    res.redirect("/login");
  }
};

productsRouter.get("/", checkUserLogged, async (req, res) => {
  const productos = await listaProductos.getAll();
  console.log(productos);
  res.render("home");
});

// Login Form
productsRouter.get("/login", async (req, res) => {
  res.render("login");
});

productsRouter.post("/login", async (req, res) => {
  const { user } = req.body;
  console.log(req.body);
  if (req.session.username) {
    return res.redirect("/perfil");
  } else {
    if (user) {
      req.session.username = user;
      res.send("sesion iniciada");
    } else {
      res.send("por favor ingresa el usuario");
    }
  }
});
productsRouter.get("/perfil", checkUserLogged, (req, res) => {
  console.log(req.session);
  res.send(`Bienvenido ${req.session.username}`);
});

productsRouter.get("/productos", async (req, res) => {
  res.render("products", { products: await listaProductos.getAll() });
});

// Rutas Moks
// ?cant=5     - Query param
productsRouter.post("/generar-productos", (req, res) => {
  const { cant } = req.query;
  let result = productsRandom.populate(parseInt(cant));
  res.send(result);
});

productsRouter.get("/productos-test", (req, res) => {
  res.render("productosTest", { products: productsRandom.getAll() });
});

productsRouter.get("/:id", checkUserLogged, async (req, res) => {
  const productId = req.params.id;
  const product = await listaProductos.getById(parseInt(productId));
  if (product) {
    return res.send(product);
  } else {
    return res.send({ error: "producto no encontrado" });
  }
});

/*productsRouter.post("/", async (req, res) => {
  const newProduct = req.body;
  const result = await listaProductos.save(newProduct);
  res.send(result);
});*/

productsRouter.put("/:id", checkUserLogged, async (req, res) => {
  const cambioObj = req.body;
  const productId = req.params.id;
  const result = await listaProductos.updateById(
    parseInt(productId),
    cambioObj
  );
  res.send(result);
});

productsRouter.delete("/:id", checkUserLogged, async (req, res) => {
  const productId = req.params.id;
  const result = await listaProductos.deleteById(parseInt(productId));
  res.send(result);
});

export { productsRouter };
