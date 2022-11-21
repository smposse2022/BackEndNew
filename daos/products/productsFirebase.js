import { ContenedorFirebase } from "../../managers/contenedorFirebase";

class ProductsDaoFirebase extends ContenedorFirebase {
  constructor(collection) {
    super(collection);
  }
}

export { ProductsDaoFirebase };
