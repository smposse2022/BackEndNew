import express from "express";
import { Server } from "socket.io";
import { options } from "./src/config/options.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import passport from "passport";
import cluster from "cluster";
import os from "os";
import { logger } from "./src/logger.js";
import { apiRouter } from "./src/routes/indexRouter.js";
import { objArguments } from "./src/config/options.js";

import { getApiDao } from "./src/dbOperations/index.js";

const {
  CartDaoContainer,
  MessagesDaoContainer,
  ProductsDaoContainer,
  UsersDaoContainer,
} = await getApiDao(options.server.DBTYPE);

// Crear el servidor
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//trabajar con archivos estaticos de public
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static("public"));

// configurando almacenamiento de sessions en Mongo Atlas
app.use(cookieParser());

app.use(
  session({
    //definimos el session store
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://smposse:coderMongo2022@cluster0.94d5car.mongodb.net/ecommerceDB?retryWrites=true&w=majority",
    }),
    secret: "claveSecreta",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000,
    },
  })
);

//configurar passport
app.use(passport.initialize()); //conectamos a passport con express.
app.use(passport.session()); //vinculacion entre passport y las sesiones de nuestros usuarios.

const PORT = objArguments.PORT;
const MODO = objArguments.mode;

// lógica Modos Fork y Cluster
if (MODO == "CLUSTER" && cluster.isPrimary) {
  // si el modo el CLUSTER y si el cluster pertenece al proceso principal
  // creamos los subprocesos que van a pertenecer a ese modo cluster
  const numCpus = os.cpus().length; // número de núcleos del procesador
  for (let i = 0; i < numCpus; i++) {
    cluster.fork(); // crea los subprocesos
  }
  cluster.on("exit", (worker) => {
    logger.info(`El subproceso ${worker.process.pid} dejó de funcionar`);
    cluster.fork();
  });
} else {
  //servidor de express
  const server = app.listen(PORT, () =>
    logger.info(`listening on port ${PORT} on process ${process.pid}`)
  );
  const io = new Server(server);
  const productsApi = ProductsDaoContainer;
  const messagesApi = MessagesDaoContainer;

  /*//socket
  io.on("connection", async (socket) => {
    logger.info("nuevo usuario conectado", socket.id);

    //enviar todos los productos
    socket.emit("products", await productsApi.getAll());

    //agrego el producto a la lista de productos
    socket.on("newProduct", async (data) => {
      const info = await productsApi.save(data);
      logger.info(info);
      //envío la lista de productos actualizada a todos los sockets
      io.sockets.emit("products", await productsApi.getAll());
    });

    //CHAT
    //Envio de todos los mensajes al socket que se conecta.
    io.sockets.emit("messages", await messagesApi.getAll());

    //recibimos el mensaje del usuario y lo guardamos en el archivo chat.txt
    socket.on("newMessage", async (newMsg) => {
      await messagesApi.save(newMsg);

      io.sockets.emit("messages", await messagesApi.getAll());
    });
  });*/
}

//api routes
app.use("/api", apiRouter);

export { app };
