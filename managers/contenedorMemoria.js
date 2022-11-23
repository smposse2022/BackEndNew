import { faker } from "@faker-js/faker";
const { datatype, commerce, image } = faker;

class ContenedorMemoria {
  constructor() {
    this.items = [];
  }

  getAll() {
    return this.items;
  }

  save(newItem) {
    newItem.id = datatype.uuid();
    this.items.push(newItem);
    return newItem;
  }

  deleteById(id) {
    let index = this.items.findIndex((obj) => obj.id == id);
    this.items.splice(index, 1);
    return `Item con id ${id} eliminado`;
  }

  deleteAll = async () => {
    try {
      this.items = [];
    } catch (error) {
      console.log(error);
    }
  };
}

export { ContenedorMemoria };
