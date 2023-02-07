import { MongoContainer } from "../../managers/contenedorMongo.js";

class CartMongoDao extends MongoContainer {
  constructor(model) {
    super(model);
  }
}

export { CartMongoDao };
