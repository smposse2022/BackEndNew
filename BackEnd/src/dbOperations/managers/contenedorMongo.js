class MongoContainer {
  constructor(model) {
    this.model = model;
  }

  async getById(id) {
    try {
      const response = await this.model.findById(id);
      const data = JSON.parse(JSON.stringify(response)); //convertir a formato json
      return data;
    } catch (error) {
      return { message: `Hubo un error ${error}`, error: true };
    }
  }

  async getAll() {
    try {
      const response = await this.model.find();
      const data = JSON.parse(JSON.stringify(response));
      return data;
    } catch (error) {
      return [];
    }
  }

  async save(body) {
    try {
      const response = await this.model.create(body);
      const data = JSON.parse(JSON.stringify(response));
      return data;
    } catch (error) {
      return { message: `Error al guardar: ${error}` };
    }
  }

  async updateById(body, id) {
    try {
      await this.model.findByIdAndUpdate(id, body, { new: true });
      return { message: "Update successfully" };
    } catch (error) {
      return { message: `Error al actualizar: no se encontró el id ${id}` };
    }
  }

  async deleteById(id) {
    try {
      await this.model.findByIdAndDelete(id);
      return { message: "delete successfully" };
    } catch (error) {
      return { message: `Error al borrar: no se encontró el id ${id}` };
    }
  }

  async deleteAll() {
    try {
      await this.model.delete({});
      return { message: "delete successfully" };
    } catch (error) {
      return { message: `Error al borrar todo: ${error}` };
    }
  }
}

export { MongoContainer };
