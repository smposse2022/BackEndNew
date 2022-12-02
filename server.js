import express from "express";
import { productsRouter } from "./routes/productRouter.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { ContenedorSql } from "./managers/contenedorSql.js";
import { ContenedorChat } from "./managers/contenedorChat.js";
//const ContenedorWebsocketSqlite = require("./managers/websocket");
const PORT = process.env.PORT || 8080;
import { options } from "./options/mySqulConfig.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { normalize, schema } from "normalizr";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";

const __dirname = dirname(fileURLToPath(import.meta.url));

const listaProductos = new ContenedorSql(options.mariaDb, "products");
//const chatWebsocket = new ContenedorSql(options.sqliteDb, "messages");
const chatWebsocket = new ContenedorChat("Messages.txt");

// Crear el servidor
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//trabajar con archivos estaticos de public
app.use(express.static(__dirname + "/public"));

//servidor de express
const server = app.listen(PORT, () => console.log(`listening on port ${PORT}`));

//configuracion template engine handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// configurando almacenamiento de sessions en Mongo Atlas
app.use(cookieParser());

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://smposse:coderMongo2022@cluster0.94d5car.mongodb.net/sessionsDB?retryWrites=true&w=majority",
    }),
    secret: "claveSecreta",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000,
    },
  })
);

// normalización
// creamos los schemas
const authorSchema = new schema.Entity("authors", {}, { idAttribute: "mail" });

const messageSchema = new schema.Entity("messages", {
  author: authorSchema,
});

// nuevo objeto para el array-creamos el schema global
const chatSchema = new schema.Entity(
  "chat",
  {
    messages: [messageSchema],
  },
  { idAttribute: "id" }
);

// aplicar la normalización
// creamos una función que normaliza la info, y la podemos llamar para normalizar los datos
const normalizarData = (data) => {
  const normalizeData = normalize(
    { id: "chatHistory", messages: data },
    chatSchema
  );
  return normalizeData;
};

// creamos una función que me entregue los mensajes normalizados
const normalizarMensajes = async () => {
  const result = await chatWebsocket.getAll();
  const messagesNormalized = normalizarData(result);
  //console.log(JSON.stringify(messagesNormalized, null, "\t"));
  return messagesNormalized;
};

//api routes
app.use("/", productsRouter);

//servidor de websocket y lo conectamos con el servidor de express
const io = new Server(server);
//let historicosMensajes = [];

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

  //CHAT
  //Envio de todos los mensajes al socket que se conecta.
  io.sockets.emit("messages", await normalizarMensajes());

  //recibimos el mensaje del usuario y lo guardamos en el archivo chat.txt
  socket.on("newMessage", async (newMsg) => {
    await chatWebsocket.save(newMsg);

    io.sockets.emit("messages", await normalizarMensajes());
  });
});
