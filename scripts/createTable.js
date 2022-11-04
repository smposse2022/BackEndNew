import { options } from "../options/mySqulConfig";
import knex from "knex";
const database = knex(options);

const productArray = [
  {
    id: 1,
    title: "Remera Verde Lisa",
    price: 4500,
    thumbnail:
      "https://d3ugyf2ht6aenh.cloudfront.net/stores/111/097/products/_mg_17161-dfec26ebd336d0efc616577498111535-1024-1024.jpg",
  },
  {
    id: 2,
    title: "Remera Beige Lisa",
    price: 4500,
    thumbnail:
      "https://d3ugyf2ht6aenh.cloudfront.net/stores/111/097/products/_mg_17061-ad68cdf82c5d284c4f16577496694867-1024-1024.jpg",
  },
  {
    id: 3,
    title: "Remera Negra Lisa",
    price: 4500,
    thumbnail:
      "https://d3ugyf2ht6aenh.cloudfront.net/stores/111/097/products/_mg_16781-feb955b3b16b4a32a016577495798656-1024-1024.jpg",
  },
];

const operationsDb = async () => {
  // validamos si la tabla de datos ya existe en la base de datos
  const tableMessagesExists = await database.schema.hasTable("messages");
  if (tableMessagesExists) {
    await database.schema.dropTable("messages");
  }
  await database.schema.createTable("string", (table) => {
    table.string("username", 15).nullable(false);
    table.string("message", 60).nullable(false);
  });

  // validamos si la tabla de datos ya existe en la base de datos
  const tableProductExists = await database.schema.hasTable("products");
  if (tableProductExists) {
    await database.schema.dropTable("products");
  }
  await database.schema.createTable("products", (table) => {
    table.increments("id");
    table.string("title", 15).nullable(false);
    table.integer("price", 15).nullable(false);
    table.integer("thumbnail", 60).nullable(false);
  });

  // insertar articulos
  await database("products").insert(productArray); // no tengo nada en articulosArray

  // listar la tabla mostrando los resultados en la consola
  const result = await database("articulos").select("*");
  const productos = result.map((elm) => ({ ...elm }));
  console
    .log(productos)

    .then(() => console.log("Data agregada"))
    .catch((err) => console.log(err))
    .finally(() => database.destroy());
};
operationsDb;
