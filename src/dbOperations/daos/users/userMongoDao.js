import { MongoContainer } from "../../managers/contenedorMongo.js";

class UserMongoDao extends MongoContainer {
  constructor(model) {
    super(model);
  }
}

export { UserMongoDao };
