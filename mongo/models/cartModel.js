import mongoose from "mongoose";

// creo la colección de productos
const cartCollection = "carritos";

// creo el schema de productos
const cartSchema = new mongoose.Schema({
  products: {
    type: [Number],
    require: true,
  },
  timestamp: {
    type: Date, // new Date().toLocaleDateString()
    require: true,
  },
});

// generar modelo, que nos permita realizar las operaciones sobre los documentos
export const cartModel = mongoose.model(cartCollection, cartSchema);
