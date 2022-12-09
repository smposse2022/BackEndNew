import express from "express";
import { listaProductos } from "../server.js";
import { chatWebsocket } from "../server.js";
//import { ContenedorSql } from "../managers/contenedorSql.js";
//import { options } from "../options/mySqulConfig.js";
import { ProductsMock } from "../moks/products.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local"; //estrategia para autenticar por correo y password.
import { UserModel } from "../models/user.js";
import bcrypt from "bcrypt"; //encriptar las contrase;as

const productsRouter = express.Router();

//const listaProductos = new ContenedorSql(options.mariaDb, "products");
const productsRandom = new ProductsMock();

/*const checkUserLogged = (req, res, next) => {
  if (req.session.username) {
    next();
  } else {
    res.redirect("/login");
  }
};*/

//crear una funcion para encriptar la contrase;
const createHash = (password) => {
  const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  return hash;
};

//estrategia de registro utilizando passport local.
passport.use(
  "signupStrategy",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
    },
    (req, username, password, done) => {
      //logica para registrar al usuario
      //verificar si el usuario exitse en db
      UserModel.findOne({ username: username }, (error, userFound) => {
        if (error) return done(error, null, { message: "Hubo un error" });
        if (userFound)
          return done(null, null, { message: "El usuario ya existe" });
        //guardamos el usuario en la db
        const newUser = {
          name: req.body.name,
          username: username,
          password: createHash(password),
        };
        UserModel.create(newUser, (error, userCreated) => {
          if (error)
            return done(error, null, {
              message: "Hubo un error al registrar el usuario",
            });
          return done(null, userCreated);
        });
      });
    }
  )
);
const isValidPassword = function (user, password) {
  return bcrypt.compareSync(password, user.password);
};

// passport/login.js
passport.use(
  "loginStrategy",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
    },
    (req, username, password, done) => {
      // chekea en Mongo si el usuario con el username indicado existe
      UserModel.findOne({ username: username }, (err, user) => {
        if (err) return done(err);
        // Si no se encuentra
        if (!user) {
          console.log("No se encontró el usuario con el username " + username);
          return done(err, null, {
            message: "Usuario no encontrado",
          });
        }
        // El usuario existe pero la contraseña no coincide
        if (!isValidPassword(user, password)) {
          console.log("Password invalido");
          return done(err, null, {
            message: "Password invalido",
          });
        }
        // El usuario y la contraseña coinciden
        return done(null, user);
      });
    }
  )
);

productsRouter.get("/", async (req, res) => {
  const productos = await listaProductos.getAll();
  const messages = await chatWebsocket.getAll();
  console.log("User", req.session.passport.user);
  res.render("home", {
    user: `Bienvenido ${req.session.passport.user.name}!!`,
  });
});

productsRouter.get("/registro", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("profile");
  } else {
    const errorMessage = req.session.messages ? req.session.messages[0] : "";
    res.render("signup", { error: errorMessage });
    req.session.messages = [];
  }
});

productsRouter.get("/inicio-sesion", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("profile");
  } else {
    res.render("login");
  }
});

productsRouter.get("/perfil", (req, res) => {
  console.log(req.session);
  if (req.isAuthenticated()) {
    res.render("profile");
  } else {
    res.send(
      "<div>Debes <a href='/inicio-sesion'>inciar sesion</a> o <a href='/registro'>registrarte</a></div>"
    );
  }
});

//rutas de autenticacion registro
productsRouter.post(
  "/signup",
  passport.authenticate("signupStrategy", {
    failureRedirect: "/registro",
    failureMessage: true, //req.sessions.messages.
  }),
  (req, res) => {
    res.redirect("/perfil");
  }
);

//ruta de autenticacion login
productsRouter.post(
  "/login",
  passport.authenticate("loginStrategy", {
    failureRedirect: "/login",
    failureMessage: true, //req.sessions.messages.
  }),
  (req, res) => {
    res.redirect("/perfil");
  }
);

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

//ruta de logout con passport
productsRouter.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.send("hubo un error al cerrar sesion");
    req.session.destroy();
    res.redirect("/");
  });
});

productsRouter.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("sesion finalizada");
  res.redirect("/");
});

// Rutas Moks
// ?cant=5     - Query param
productsRouter.post("/generar-productos", (req, res) => {
  const { cant } = req.query;
  let result = productsRandom.populate(parseInt(cant));
  res.send(result);
});

productsRouter.get("/productos-test", (req, res) => {
  res.render("productosTest", { products: productsRandom.getAll() });
});

productsRouter.get("/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await listaProductos.getById(parseInt(productId));
  if (product) {
    return res.send(product);
  } else {
    return res.send({ error: "producto no encontrado" });
  }
});

productsRouter.put("/:id", async (req, res) => {
  const cambioObj = req.body;
  const productId = req.params.id;
  const result = await listaProductos.updateById(
    parseInt(productId),
    cambioObj
  );
  res.send(result);
});

productsRouter.delete("/:id", async (req, res) => {
  const productId = req.params.id;
  const result = await listaProductos.deleteById(parseInt(productId));
  res.send(result);
});

export { productsRouter };
