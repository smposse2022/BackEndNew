import {options} from("../options/mySqulConfig")
import knex from "knex";

const database = knex(options);

class ContenedorSql {
  Constructor(options, tableName) {
    this.database = knex(options);
    this.table = tableName;
  }
  getAll= async()=> {
    const result = await this.database("products").select("*");
    const productos = result.map((elm) => ({ ...elm }));
    return productos;
  }

  save = async (product) => {
    await database("products").insert(product)
    .then(() => console.log("Data agregada"))
    .catch((err) => console.log(err))
    .finally(() => database.destroy());
  }
      

  getById = async (id) => {
    await database
    .from("products")
    .select("*")
    .where("id", "=", id)
    .then((result) => {
    const productoElegido = result.map((element) => ({ ...element }));
    console.log(productoElegido);
  })
  .catch((err) => console.log(err))
  .finally(() => database.destroy());
  };

  deleteById = async (id) => {
    await database
    .from("products")
    .where("id", "=", id)
    .del()
    .then(() => console.log("producto eliminado"))
    .catch((err) => console.log(err))
    .finally(() => database.destroy());
    };

  deleteAll = async () => {
    await database
    .from("products")
    .select("*")
    .del()
    .then(() => console.log("productos eliminado"))
    .catch((err) => console.log(err))
    .finally(() => database.destroy());
  };

  updateById = async (id, body) => {
    database
    .from("products")
    .where("id", "=", id)
    .update({ body: body })
    .then(() => console.log("producto actualizado"))
    .catch((err) => console.log(err))
    .finally(() => database.destroy());
  };
}

module.exports = ContenedorSql;
