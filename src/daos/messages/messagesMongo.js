import { ContenedorMongo } from "../../dbOperations/managers/contenedorMongo.js";

class MessagesDaoMongo extends ContenedorMongo {
  constructor(model) {
    super(model);
  }
}

export { MessagesDaoMongo };
