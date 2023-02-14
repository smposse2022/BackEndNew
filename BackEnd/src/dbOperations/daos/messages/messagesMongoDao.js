import { MongoContainer } from "../../managers/contenedorMongo.js";

class MessagesMongoDao extends MongoContainer {
  constructor(model) {
    super(model);
  }
}

export { MessagesMongoDao };
