import express from "express";
import { productsRouter } from "./routes/productRouter.js";
import { cartsRouter } from "./routes/cartRouter.js";
import handlebars from "express-handlebars"; // no estoy seguro que esté bien
import { Server } from "socket.io";
import mongoose from "mongoose";
import { ContenedorSql } from "./managers/contenedorSql.js";
import { options } from "./options/mySqulConfig.js";
import { fileURLToPath } from "url";
import path from "path";
import { listaProductos } from "./routes/productRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//const ContenedorSql = require("./managers/contenedorSql");
//const ContenedorWebsocketSqlite = require("./managers/websocket");
const PORT = process.env.PORT || 8080;

//const listaProductos = new ContenedorSql(options.mariaDb, "products");
const chatWebsocket = new ContenedorSql(options.sqliteDb, "messages");

// Crear el servidor
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//trabajar con archivos estaticos de public
app.use(express.static("public"));

//servidor de express
const server = app.listen(PORT, () => console.log(`listening on port ${PORT}`));

//configuracion template engine handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// routes
//view routes
app.get("/", async (req, res) => {
  res.render("home");
});

//router productos y carritos
app.use("/api/productos", productsRouter);
app.use("/api/carritos", cartsRouter);

//servidor de websocket y lo conectamos con el servidor de express
const io = new Server(server);
//let historicosMensajes = [];

//socket
io.on("connection", async (socket) => {
  console.log("nuevo usuario conectado", socket.id);

  //enviar todos los productos
  //socket.emit("products", await listaProductos.getAll());

  //agrego el producto a la lista de productos
  socket.on("newProduct", async (data) => {
    await listaProductos.save(data);
    //envío la lista de productos actualizada a todos los sockets
    io.sockets.emit("products", await listaProductos.getAll());
  });

  //CHAT
  //Envio de todos los mensajes al socket que se conecta.
  io.sockets.emit("messages", await chatWebsocket.getAll());

  //recibimos el mensaje del usuario y lo guardamos en el archivo chat.txt
  socket.on("newMessage", async (newMsg) => {
    await chatWebsocket.save(newMsg);
    io.sockets.emit("messages", await chatWebsocket.getAll());
  });
});

// conexiones Mongo
// la url donde se está ejecutando mi base de datos
const URL = "mongodb://127.0.0.1:27017/segundaPreEntrega";

// conectamos la base de datos
mongoose.connect(
  URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) throw new Error(`Conexion fallida ${error}`);
    console.log("conexion base de datos exitosa!");
  }
);
