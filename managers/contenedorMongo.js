class ContenedorMongo {
  constructor(model) {
    this.model = model;
  }
  getAll = async () => {
    try {
      const data = await this.model.find();
      //const result = data.map((elm) => ({ ...elm }));
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  save = async (newItem) => {
    try {
      console.log(newItem);
      await this.model.create(newItem);
      console.log(newItem);
      return `new item saved`;
    } catch (error) {
      console.log(error);
    }
  };

  getById = async (id) => {
    try {
      const result = await this.model.find({ _id: id });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  deleteById = async (id) => {
    try {
      const itemEliminado = await this.model.deleteOne({ _id: id });
      console.log(itemEliminado);
      return `item deleted`;
    } catch (error) {
      console.log(error);
    }
  };

  deleteAll = async () => {
    try {
      await this.model.deleteMany({});
      console.log("Se han borrado todos los documentos de la colección");
    } catch (error) {
      console.log(error);
    }
  };

  updateById = async (id, title) => {
    // no debería modificar sólo el título, ver de hacerlo con body
    try {
      itemUpdated = await this.model.updateOne({ _id: id }, { $set: title });
      console.log(itemUpdated);
      return `item updated`;
    } catch (error) {
      console.log(error);
    }
  };
}

export { ContenedorMongo };
