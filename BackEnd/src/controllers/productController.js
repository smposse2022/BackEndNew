import { logger } from "../logger.js";
import {
  getProducts,
  getOneProduct,
  updateProduct,
  addProduct,
  deleteProduct,
} from "../services/productServices.js";

export const getProductsController = async (req, res) => {
  try {
    logger.info("Acceso a Ruta productos");
    const products = await getProducts();
    res.render("productos", { products: products });
  } catch (error) {
    logger.error(`Error al cargar los productos ${error}`);
  }
};

export const addProductController = async (req, res) => {
  try {
    const newProduct = await addProduct(req.body);
    res.send(newProduct);
  } catch (error) {
    logger.error(`Error al guardar el producto ${error}`);
  }
};

export const getOneProductController = async (req, res) => {
  try {
    const product = await getOneProduct(parseInt(req.params.id));
    res.send(product);
  } catch (error) {
    logger.error(`Error al buscar el producto ${error}`);
  }
};

export const updateProductController = async (req, res) => {
  try {
    logger.info("Acceso a actualizar filtrado por id");
    const result = await updateProduct(req.body, parseInt(req.params.id));
    res.send(result);
  } catch (error) {
    logger.error(`Error al actualizar producto ${error}`);
  }
};

export const deleteOneProductController = async (req, res) => {
  try {
    const result = await deleteProduct(parseInt(req.params.id));
    res.send(`Producto eliminado: ${result}`);
  } catch (error) {
    logger.error(`Error al eliminar producto ${error}`);
  }
};
