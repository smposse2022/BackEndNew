import { logger } from "../logger.js";
import {
  getProducts,
  getOneProduct,
  updateProduct,
  addProduct,
  deleteProduct,
  deleteAllProducts,
} from "../services/productServices.js";

export const getProductsController = async (req, res) => {
  try {
    logger.info("Listado de productos");
    const products = await getProducts();
    res.status(200).json({ Productos: products });
  } catch (error) {
    logger.error(`Error al cargar los productos ${error}`);
    res.status(400).json({ message: `Error al cargar los productos ${error}` });
  }
};

export const addProductController = async (req, res) => {
  try {
    const newProduct = await addProduct(req.body);
    res.status(200).json({ NewProduct: newProduct });
  } catch (error) {
    logger.error(`Error al guardar el producto ${error}`);
    res.status(400).json({ message: `Error al guardar el producto ${error}` });
  }
};

export const getOneProductController = async (req, res) => {
  try {
    const product = await getOneProduct(req.params.id);
    console.log(req.params.id);
    res.status(200).json({ Product: product });
  } catch (error) {
    logger.error(`Error al buscar el producto ${error}`);
    res.status(400).json({ message: `Error al buscar el producto ${error}` });
  }
};

export const updateProductController = async (req, res) => {
  try {
    logger.info("Acceso a actualizar filtrado por id");
    const result = await updateProduct(req.body, parseInt(req.params.id));
    res.status(200).json({ message: result });
  } catch (error) {
    logger.error(`Error al actualizar producto ${error}`);
    res.status(400).json({ message: `Error al actualizar producto ${error}` });
  }
};

export const deleteOneProductController = async (req, res) => {
  const prodId = req.params.id;
  try {
    const response = await deleteProduct(prodId);
    res.status(200).json({ message: response });
    res.send(`Producto eliminado: ${response}`);
  } catch (error) {
    logger.error(`Error al eliminar producto ${error}`);
    res.status(400).json({ message: `Error al eliminar producto ${error}` });
  }
};

export const deleteAllProductsController = async (req, res) => {
  try {
    const response = await deleteAllProducts();
    res.status(200).json({ message: response });
    res.send(`Productos eliminados: ${response}`);
  } catch (error) {
    logger.error(`Error al eliminar todos los productos ${error}`);
    res.status(400).json({ message: `Hubo un error ${error}` });
  }
};
