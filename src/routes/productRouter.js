import express from "express";
import { chatWebsocket } from "../../server.js";
import { ContenedorDaoProductos } from "../daos/index.js";
import { checkAdminRole } from "../middlewares/isAdmin.js";
import { checkLogin } from "../middlewares/checkLogin.js";
import { options } from "../config/databaseConfig.js";
import { ProductsMock } from "../moks/products.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local"; //estrategia para autenticar por correo y password.
import { UserModel } from "../models/user.js";
import bcrypt from "bcrypt"; //encriptar las contrase;as
import { fork } from "child_process";
import compression from "compression";
import { logger } from "../logger.js";
import { createTransport } from "nodemailer";
import twilio from "twilio";

// Product manager
const listaProductos = ContenedorDaoProductos;

// Product Router
const productsRouter = express.Router();

const productsRandom = new ProductsMock();

/*productsRouter.get("/favicon.ico", (req, res) => {
  return "your faveicon";
});*/

productsRouter.get("/", async (req, res) => {
  const productos = await listaProductos.getAll();
  const messages = await chatWebsocket.getAll();
  if (req.session.passport) {
    const usuario = await UserModel.findOne({ _id: req.session.passport.user });
    logger.info("Acceso a ruta home con usuario registrado");
    res.render("home", { user: usuario.name });
  } else {
    logger.info("Acceso a ruta home sin usuario registrado");
    res.render("home", { user: "Invitado" });
  }
});

/*productsRouter.post("/login", (req, res) => {
  const user = req.body;
  //el usuario existe
  const userExists = users.find((elm) => elm.email === user.email);
  if (userExists) {
    //validar la contrase;a
    if (userExists.password === user.password) {
      req.session.user = user;
      res.redirect("/perfil");
    } else {
      res.redirect("/inicio-sesion");
    }
  } else {
    res.redirect("/registro");
  }
});*/

// Ruta contar numeros No bloqueante
// ?cant=x     - Query param
productsRouter.get("/randoms", (req, res) => {
  logger.info("Acceso a Ruta randoms");
  let { cant } = req.query;
  if (!cant) {
    cant = 1000000;
  }
  if (cant < 1 || cant > 1e10) {
    logger.error("Parámetro ingresado inválido");
    res.send("Debe ingresar por parámetro un valor entre 1 y 10.000.000.000");
  }
  const child = fork("./child.js");
  //recibimos mensajes del proceso hijo
  child.on("message", (childMsg) => {
    if (childMsg === "listo") {
      //recibimos notificacion del proceso hijo, y le mandamos un mensaje para que comience a operar.
      child.send({ message: "Iniciar", cant: cant });
    } else {
      res.send({ resultado: childMsg });
    }
  });
});

// Ruta info - process
productsRouter.get("/info", (req, res) => {
  logger.info("Acceso a Ruta info");
  const info = {
    argumentosDeEntrada: process.cwd(),
    plataforma: process.platform,
    nodeVersion: process.version,
    memory: process.memoryUsage(),
    path: process.argv[0],
    id: process.pid,
    carpeta: process.argv[1],
  };
  logger.info(info);
  res.status(200).json(info);
});

// Ruta info Compression
productsRouter.get("/infoCompression", compression(), (req, res) => {
  logger.info("Acceso a Ruta infoCompression");
  const info = {
    argumentosDeEntrada: process.cwd(),
    plataforma: process.platform,
    nodeVersion: process.version,
    memory: process.memoryUsage(),
    path: process.argv[0],
    id: process.pid,
    carpeta: process.argv[1],
  };
  res.status(200).json(info);
});

// Rutas Moks
// ?cant=5     - Query param
productsRouter.post("/generar-productos", (req, res) => {
  logger.info("Acceso a Ruta generar-productos");
  const { cant } = req.query;
  let result = productsRandom.populate(parseInt(cant));
  res.send(result);
});

productsRouter.get("/productos-test", (req, res) => {
  logger.info("Acceso a Ruta productos-test");
  res.render("productosTest", { products: productsRandom.getAll() });
});

productsRouter.get("/productos/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await listaProductos.getById(parseInt(productId));
  if (product) {
    return res.send(product);
  } else {
    return res.redirect("/");
  }
});

productsRouter.put("/productos/:id", async (req, res) => {
  logger.info("Acceso a actualizar filtrado por id");
  const cambioObj = req.body;
  const productId = req.params.id;
  const result = await listaProductos.updateById(
    parseInt(productId),
    cambioObj
  );
  res.send(result);
});

productsRouter.delete("/productos/:id", async (req, res) => {
  logger.info("Borrar producto por id");
  const productId = req.params.id;
  const result = await listaProductos.deleteById(parseInt(productId));
  res.send(result);
});

productsRouter.get("*", (req, res) => {
  logger.warn("Se intentó acceder a una ruta inexistente");
  res.redirect("/");
});

//comandos
// curl -X GET "http://localhost:8080/xxx"

//profiling commands
// node --prof server.js

//artillery quick --count 20 -n 50 http://localhost:8080/info > result_info.txt

//compilacion de archivos isolate
// node --prof-process isolate-info.log > result_prof_info.txt

// Nodemailer

const testEmail = "smposse@gmail.com";
const testPass = "ngnusqmuhxkswwjp"; // Contraseña para conectar a Google: ngnusqmuhxkswwjp

// configuración del transporte de Nodemailer
const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: testEmail,
    pass: testPass,
  },
  // Propiedades para usar Postman
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
});

const emailTemplate = `<div>
    <h1>Bienvenido!!</h1>
    <img src="https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/portals_3/2x1_SuperMarioHub.jpg" style="width:250px"/>
    <p>Ya puedes empezar a usar nuestros servicios</p>
    <a href="https://www.google.com/">Explorar</a>
</div>`;

const mailOptions = {
  from: "Servidor de NodeJs",
  to: testEmail,
  subject: "Correo de prueba desde un servidor de Node",
  html: emailTemplate,
};

productsRouter.post("/envio-mail-gmail", async (req, res) => {
  try {
    const response = await transporter.sendMail(mailOptions);
    res.send(`El mensaje fue enviado ${response}`);
  } catch (error) {
    logger.error(`Hubo un error ${error}`);
  }
});

// Twilio

// Agregamos las credenciales de Twilio - para que la aplicación de NodeJs se conecte con Twilio
const accountId = "ACa02cf41b405cac0fbde06beb807035c8";
const authToken = "e401bf25bb399a0005c3aef491e66501";

// creamos un cliente para conectar con Twilio
const client = twilio(accountId, authToken);

productsRouter.post("/twilio-sms", async (req, res) => {
  try {
    // utilizamos el cliente para enviar un mensaje
    const response = await client.messages.create({
      body: "Hola. Envío de Mensaje desde NodeJs utilizando Twilio",
      from: "+16064023943", // número desde donde sale el mensaje
      to: "+541130296235", // destinatario - Santiago Posse
    });
    res.send(`El mensaje fue enviado ${response}`);
  } catch (error) {
    logger.error(`Hubo un error ${error}`);
  }
});

// Twilio - Whatsapp
productsRouter.post("/twilio-whatsapp", async (req, res) => {
  try {
    // utilizamos el cliente para enviar un mensaje
    const response = await client.messages.create({
      body: "Hola. Envío de Mensaje desde NodeJs utilizando Twilio",
      from: "whatsapp:+14155238886", // número desde donde sale el mensaje
      to: "whatsapp:+5491130296235", // destinatario - Santiago Posse
    });
    res.send(`El mensaje fue enviado ${response}`);
  } catch (error) {
    logger.error(`Hubo un error ${error}`);
  }
});

export { productsRouter };
