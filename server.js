const express = require("express");
const { productsRouter, products } = require("./routes/productRouter");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");
const ContenedorSql = require("./managers/contenedorSql");
//const ContenedorWebsocketSqlite = require("./managers/websocket");
const PORT = process.env.PORT || 8080;
const option = require("./options/mySqulConfig");

const listaProductos = new ContenedorSql(option.mariDb, "products");
const chatWebsocket = new ContenedorSql(option.sqliteDb, "messages");

// Crear el servidor
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//trabajar con archivos estaticos de public
app.use(express.static(__dirname + "/public"));

//servidor de express
const server = app.listen(PORT, () => console.log(`listening on port ${PORT}`));

//api routes
app.use("/api", productsRouter);

//configuracion template engine handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// routes
//view routes
app.get("/", async (req, res) => {
  res.render("home");
});

app.get("/productos", async (req, res) => {
  res.render("products", { products: await listaProductos.getAll() });
});

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
    io.sockets.emit("historico", await chatWebsocket.getAll());
  });
});
