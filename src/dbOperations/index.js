import { MongoContainer } from "./managers/contenedorMongo.js";
import { UserModel } from "../models/user.js";
import { CartModel } from "./models/cartModel.js";
import { MessagesModel } from "../models/messagesModel.js";
import { ProductModel } from "../models/productModel.js";

export const UserManager = new MongoContainer(UserModel);
export const CartManager = new MongoContainer(CartModel);
export const MessageManager = new MongoContainer(MessagesModel);
export const ProductManager = new MongoContainer(ProductModel);
