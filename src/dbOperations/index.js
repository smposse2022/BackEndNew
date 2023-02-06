import { MongoContainer } from "./managers/contenedorMongo.js";
import { UserModel } from "../dbOperations/models/userModel.js";
import { CartModel } from "../dbOperations/models/cartModel.js";
import { MessagesModel } from "../dbOperations/models/messagesModel.js";
import { ProductModel } from "../dbOperations/models/productModel.js";

export const UserManager = new MongoContainer(UserModel);
export const CartManager = new MongoContainer(CartModel);
export const MessageManager = new MongoContainer(MessagesModel);
export const ProductManager = new MongoContainer(ProductModel);
