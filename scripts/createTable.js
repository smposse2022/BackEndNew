import { options } from "../options/mySqulConfig";
import knex from "knex";

// creamos la instancia de la base de datos y la guardamos en una variable
const database = knex(options);

// CREATE TABLE nombreTabla
database.schema
  .createTable("cars", (table) => {
    table.increments("id"); // sería como el AUTO_INCREMENT NOT NULL PRIMARY KEY
    table.string("name", 20); // name VARCHAR (20)
    table.integer("price"); // price INT
  })
  .then(() => console.log("table created"))
  .catch((err) => console.log(err))
  .finally(() => database.destroy()); // cerrar la sesión
