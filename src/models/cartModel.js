import mongoose from "mongoose";

// creo la colección de carritos
const cartCollection = "carritos";

// creo el schema de carritos
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
export const CartModel = mongoose.model(cartCollection, cartSchema);
