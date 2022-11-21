import { ContenedorFirebase } from "../../managers/contenedorFirebase";

class CartDaoFirebase extends ContenedorFirebase {
  constructor(collection) {
    super(collection);
  }
}

export { CartDaoFirebase };
