const express = require("express");
const PORT = process.env.PORT || 8080;
const productsRouter = require("./routes/productsRouter");
const path = require("path");
const handlebars = require("express-handlebars");

// Crear el servidor
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", productsRouter); // Asocio una ruta principal con todas las rutas de los productos. Paso el productRouter como 2do parámetro

//servidor de express
const server = app.listen(PORT, () => console.log(`listening on port ${PORT}`));

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
