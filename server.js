const express = require("express");
const { Server } = require("socket.io");
const Contenedor = require("./managers/products");
const handlebars = require("express-handlebars");
const path = require("path");
const PORT = process.env.PORT || 8080;
const productRouter = require("./routes/productRouter");

const listaProductos = new Contenedor("./files/Products");

// Crear el servidor
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//servidor de express
const server = app.listen(PORT, () => console.log(`listening on port ${PORT}`));
app.use("/api", productRouter); // Asocio una ruta principal con todas las rutas de los productos. Paso el productRouter como 2do parámetro

//servidor de websocket y lo conectamos con el servidor de express
const io = new Server(server);
//trabajar con archivos estaticos de public
app.use(express.static(__dirname + "/public"));

// HandleBars
const folderViews = path.join(__dirname, "views");
console.log(folderViews);

// 1° Configurar nuestro motor de plantillas
// definir el motor
//          extensión, ejecutar el motor
app.engine("handlebars", handlebars.engine());

// 2° ubicar la carpeta donde vamos a colocar los templates de extensión .handlebars
//      el primer param es views, el 2do es la ruta
app.set("views", folderViews);

// 3° definir el motor para express
// primer param fijo es view engine, el 2do es el motor a usar, en este caso handlebars
app.set("view engine", "handlebars");
