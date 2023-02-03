import {
  getProducts,
  addProduct,
  updateProduct,
  getOneProduct,
  deleteProduct,
  deleteAllProducts,
} from "../services/products.services.js";
import { logger } from "../logger.js";
import { ProductsMock } from "../moks/products.js";
import { fork } from "child_process";

export const getProductsController = async (req, res) => {
  try {
    logger.info("Acceso a Ruta productos-test");
    const products = await getProducts();
    res.render("productos", { products: products });
  } catch (error) {
    logger.error(error);
  }
};
export const generarRandomsController = async (req, res) => {
  try {
    const productsRandom = new ProductsMock();
    logger.info("Acceso a Ruta generar-productos");
    const { cant } = req.query;
    let result = productsRandom.populate(parseInt(cant));
    res.send(result);
  } catch (error) {
    logger.error(error);
  }
};

export const getProductController = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await getOneProduct(parseInt(productId));
    if (product) {
      return res.send(product);
    } else {
      return res.redirect("/");
    }
  } catch (error) {
    logger.error(error);
  }
};

export const getInfoController = async (req, res) => {
  try {
    const info = {
      argumentosDeEntrada: process.cwd(),
      plataforma: process.platform,
      nodeVersion: process.version,
      memory: process.memoryUsage(),
      path: process.argv[0],
      id: process.pid,
      carpeta: process.argv[1],
    };
    logger.info(info);
    res.status(200).json(info);
  } catch (error) {
    logger.error(error);
  }
};

export const contarNoBloq = async (reqmres) => {
  try {
    logger.info("Acceso a Ruta randoms");
    let { cant } = req.query;
    if (!cant) {
      cant = 1000000;
    }
    if (cant < 1 || cant > 1e10) {
      logger.error("Parámetro ingresado inválido");
      res.send("Debe ingresar por parámetro un valor entre 1 y 10.000.000.000");
    }
    const child = fork("./child.js");
    //recibimos mensajes del proceso hijo
    child.on("message", (childMsg) => {
      if (childMsg === "listo") {
        //recibimos notificacion del proceso hijo, y le mandamos un mensaje para que comience a operar.
        child.send({ message: "Iniciar", cant: cant });
      } else {
        res.send({ resultado: childMsg });
      }
    });
  } catch (error) {
    logger.error(error);
  }
};

export const updateController = async (req, res) => {
  try {
    logger.info("Acceso a actualizar filtrado por id");
    const cambioObj = req.body;
    const productId = req.params.id;
    const result = await updateProduct(parseInt(productId), cambioObj);
    res.send(result);
  } catch (error) {
    logger.error(error);
  }
};

export const deleteProdController = async (req, res) => {
  try {
    logger.info("Borrar producto por id");
    const productId = req.params.id;
    const result = await deleteProduct(parseInt(productId));
    res.send(result);
  } catch (error) {
    logger.error(error);
  }
};
