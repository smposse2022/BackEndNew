import { MongoContainer } from "../../managers/contenedorMongo.js";

class ProductsMongoDao extends MongoContainer {
  constructor(model) {
    super(model);
  }
}

export { ProductsMongoDao };
