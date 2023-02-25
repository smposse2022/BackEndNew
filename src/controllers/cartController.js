import { logger } from "../logger.js";
import {
  getCarts,
  addCart,
  deleteCart,
  getOneCart,
  updateCart,
} from "../services/cartServices.js";
import { getOneProduct } from "../services/productServices.js";

export const getCartsController = async (req, res) => {
  try {
    const response = await getCarts();
    res.status(200).json({ Carritos: response });
  } catch (error) {
    logger.error(`Error al cargar los carritos ${error}`);
    res.status(400).json({ message: `Error al cargar los carritos ${error}` });
  }
};

export const createCartController = async (req, res) => {
  try {
    const response = await addCart(req.body);
    res.status(200).json({ NewCarritos: response });
  } catch (error) {
    logger.error(`Error al crear nuevo carrito${error}`);
    res.status(400).json({ message: `Error al crear nuevo carrito${error}` });
  }
};

export const deleteCartController = async (req, res) => {
  try {
    const response = await deleteCart(parseInt(req.params.id));
    res.status(200).json({ DeletedCart: response });
  } catch (error) {
    logger.error(`Error al borrar el carrito${error}`);
    res.status(400).json({ message: `Error al borrar el carrito${error}` });
  }
};

export const getProductsofCartController = async (req, res) => {
  try {
    const carritoResponse = await getOneCart(parseInt(req.params.id));
    if (carritoResponse.error) {
      res.json(carritoResponse);
    } else {
      const getData = async () => {
        const products = await Promise.all(
          carritoResponse.message.products.map(async (element) => {
            const productResponse = await getOneProduct(element);
            return productResponse.message;
          })
        );
        res.json({ products: products });
      };
      getData();
    }
  } catch (error) {
    logger.error(error);
  }
};

export const addProductToCartController = async (req, res) => {
  try {
    const cartId = parseInt(req.params.id);
    const productId = parseInt(req.body.id);
    const carritoResponse = await getOneCart(cartId);
    if (carritoResponse.error) {
      res.json({ message: `El carrito con id: ${cartId} no fue encontrado` });
    } else {
      const productoResponse = await getOneProduct(productId);
      if (productoResponse.error) {
        res.json(productoResponse);
      } else {
        carritoResponse.message.products.push(productoResponse.message.id);
        const response = await updateCart(carritoResponse.message, cartId);
        res.json({ message: "product added" });
      }
    }
  } catch (error) {
    logger.error(`Error al guardar producto en el carrito ${error}`);
  }
};

export const deleteProdFormCartController = async (req, res) => {
  try {
    const cartId = parseInt(req.params.id);
    const productId = parseInt(req.params.idProd);
    const carritoResponse = await getOneCart(cartId);
    if (carritoResponse.error) {
      res.json({ message: `El carrito con id: ${cartId} no fue encontrado` });
    } else {
      const index = carritoResponse.message.products.findIndex(
        (p) => p === productId
      );
      if (index !== -1) {
        carritoResponse.message.products.splice(index, 1);
        await updateCart(carritoResponse.message, cartId);
        res.json({ message: "product deleted" });
      } else {
        res.json({
          message: `El producto no se encontro en el carrito: ${productId}`,
        });
      }
    }
  } catch (error) {
    logger.error(`Error al eliminar el producto ${error}`);
  }
};
