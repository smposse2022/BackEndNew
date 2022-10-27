console.log("javascript fun");
//punto de comunicacion cliente
const socketClient = io();
//captura el valor del usuario
let user;
Swal.fire({
  title: "hola usuario",
  text: "bienvenido",
  input: "text",
  allowOutsideClick: false,
}).then((respuesta) => {
  user = respuesta.value;
}); /*
//guardar un productos
const productForm = document.getElementById("form");
productForm.addEventListener("submit", (evt) => {
  //prevenir q se refresque
  evt.preventDefault();
  const product = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    image: document.getElementById("image").value,
  };
  title.value = "";
  price.value = "";
  image.value = "";
  //enviamos el nuevo producto al servidor
  socketClient.emit("newProduct", product);
});

//productos en tiempo real
const createTable = async (data) => {
  const response = await fetch("./templates/tabla.hbs");
  const result = await response.text();
  const template = Handlebars.compile(result);
  const html = await template({ products: data });
  return html;
};

const productsContainer = document.getElementById("productsContainer");
socketClient.on("products", async (data) => {
  const htmlProducts = await createTable(data);
  productsContainer.innerHTML = htmlProducts;
});*/
