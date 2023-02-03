import {
  getCarts,
  addProductToCart,
  updateCart,
  getCart,
  deleteCart,
  deleteAllCarts,
} from "../services/carts.services.js";
import { getOneProduct } from "../services/products.services.js";

export const getCartsController = async (req, res) => {
  try {
    const response = await getCarts();
    res.json(response);
  } catch (error) {
    logger.error(error);
  }
};

export const addProdToCartController = async (req, res) => {
  try {
    const response = await addProductToCart({
      products: [],
      timestamp: new Date().toLocaleDateString(),
    });
    res.json(response);
  } catch (error) {
    logger.error(error);
  }
};

export const deleteCartController = async (req, res) => {
  try {
    const cartId = parseInt(req.params.id);
    res.json(await deleteCart(cartId));
  } catch (error) {
    logger.error(error);
  }
};

export const getProdFromCartController = async (req, res) => {
  try {
    const cartId = parseInt(req.params.id);
    const carritoResponse = await getCart(cartId);
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

export const addProdToCartOneController = async (req, res) => {
  try {
    const cartId = parseInt(req.params.id);
    const productId = parseInt(req.body.id);
    const carritoResponse = await getCart(cartId);
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
    logger.error(error);
  }
};

export const deleteProdFromCartController = async (req, res) => {
  try {
    const cartId = parseInt(req.params.id);
    const productId = parseInt(req.params.idProd);
    const carritoResponse = await getCart(cartId);
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
    logger.error(error);
  }
};
