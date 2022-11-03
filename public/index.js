/*//punto de comunicacion cliente
const socketClient = io();
//captura el nombre del usuario al ingresar
let user;
Swal.fire({
  title: "Hola usuario",
  text: "Ingrese su nombre",
  input: "text",
  allowOutsideClick: false,
}).then((respuesta) => {
  user = respuesta.value;
});

//guardar un productos
const productForm = document.getElementById("form");
productForm.addEventListener("submit", (evt) => {
  //prevenir q se refresque
  evt.preventDefault();
  const product = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    image: document.getElementById("thumbnail").value,
  };
  title.value = "";
  price.value = "";
  thumbnail.value = "";
  //enviamos el nuevo producto al servidor
  socketClient.emit("newProduct", product);
});

//productos en tiempo real
const createTable = async (data) => {
  const response = await fetch("./templates/table.handlebars");
  const result = await response.text();
  const template = Handlebars.compile(result);
  const html = await template({ products: data });
  return html;
};

const productsContainer = document.getElementById("productsContainer");
socketClient.on("products", async (data) => {
  const htmlProducts = await createTable(data);
  productsContainer.innerHTML = htmlProducts;
});

//logica del chat con Websocket
//enviar mensaje
const campo = document.getElementById("messageField");

campo.addEventListener("keydown", (evt) => {
  console.log(evt.key);
  if (evt.key === "Enter") {
    socketClient.emit("message", {
      username: user,
      message: campo.value,
    });
    campo.value = "";
  }
});
//mostrar los mensajes al cargar la página
const messageContainer = document.getElementById("messageContainer");
socketClient.on("historico", (data) => {
  let elements = "";
  data.forEach((item) => {
    elements =
      elements + `<p><strong>${item.username}</strong>: ${item.message}</p>`;
  });
  messageContainer.innerHTML = elements;
});*/
