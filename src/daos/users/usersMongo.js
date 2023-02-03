import { ContenedorMongo } from "../../dbOperations/managers/contenedorMongo.js";

class UsersDaoMongo extends ContenedorMongo {
  constructor(model) {
    super(model);
  }
}

export { UsersDaoMongo };
