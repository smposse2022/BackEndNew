const express = require("express");
const { Server } = require("socket.io");
const ContenedorSql = require("./managers/products");
const ContenedorWebsocketSqlite = require("./managers/websocket");
const PORT = process.env.PORT || 8080;
const optionMysql = require("./options/mySqulConfig");
const optionSqlite = require("./options/sqliteConfig");

const listaProductos = new ContenedorSql(optionMysql, "products");
const chatWebsocket = new ContenedorWebsocketSqlite(optionSqlite, "messages");

// Crear el servidor
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//servidor de express
const server = app.listen(PORT, () => console.log(`listening on port ${PORT}`));

//trabajar con archivos estaticos de public
app.use(express.static(__dirname + "/public"));

//servidor de websocket y lo conectamos con el servidor de express
const io = new Server(server);
let historicosMensajes = [];

//socket
io.on("connection", async (socket) => {
  console.log("nuevo usuario conectado", socket.id);

  //enviar todos los productos
  socket.emit("products", await listaProductos.getAll());

  //agrego el producto a la lista de productos
  socket.on("newProduct", async (data) => {
    await listaProductos.save(data);
    //envío la lista de productos actualizada a todos los sockets
    io.sockets.emit("products", await listaProductos.getAll());
  });

  socket.broadcast.emit("newUser");
  socket.emit("historico", await chatWebsocket.getAll());
  socket.on("message", async (data) => {
    console.log(data);
    historicosMensajes.push(data);
    await chatWebsocket.save(historicosMensajes);
    await io.sockets.emit("historico", await chatWebsocket.getAll());
  });
});
