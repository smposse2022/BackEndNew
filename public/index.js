const socketClient = io();
//captura el nombre del usuario al ingresar
let user;
/*Swal.fire({
  title: "Hola usuario",
  text: "bienvenido, ingresa tu usario",
  input: "text",
  customClass: {
    validationMessage: "my-validation-message",
  },
  preConfirm: (value) => {
    if (!value) {
      Swal.showValidationMessage(
        '<i class="fa fa-info-circle"></i>Nombre obligatorio'
      );
    }
  },
  allowOutsideClick: false,
}).then((respuesta) => {
  user = respuesta.value;
  document.getElementById(
    "userEmail"
  ).innerHTML = `<strong>Bienvenido ${respuesta.value}!!</strong>`;
});*/
Swal.fire({
  title: "Formulario de Ingreso",
  html: `<input type="text" id="mail" class="swal2-input" placeholder="Ingrese su Mail">
  <input type="text" id="name" class="swal2-input" placeholder="Ingrese su Nombre">
  <input type="text" id="lastName" class="swal2-input" placeholder="Ingrese su Apellido">
  <input type="text" id="age" class="swal2-input" placeholder="Ingrese su Edad">
  <input type="text" id="alias" class="swal2-input" placeholder="Ingrese su Alias">
  <input type="text" id="avatar" class="swal2-input" placeholder="Ingrese su Avatar(foto, logo)">`,
  confirmButtonText: "Sign in",
  focusConfirm: false,
  preConfirm: () => {
    const mail = Swal.getPopup().querySelector("#mail").value;
    const name = Swal.getPopup().querySelector("#name").value;
    const lastName = Swal.getPopup().querySelector("#lastName").value;
    const age = Swal.getPopup().querySelector("#age").value;
    const alias = Swal.getPopup().querySelector("#alias").value;
    const avatar = Swal.getPopup().querySelector("#avatar").value;

    if (!mail || !name || !lastName || !age || !alias || !avatar) {
      Swal.showValidationMessage(`Campos obligatorios`);
    }
    return { mail, name, lastName, age, alias, avatar };
  },
  allowOutsideClick: false,
}).then((result) => {
  Swal.fire(
    `
    Email: ${result.value.mail}
    Nombre: ${result.value.name}
    Apellido: ${result.value.lastName}
    Edad: ${result.value.age}
    Alias: ${result.value.alias}
    Avatar: ${result.value.avatar}
  `.trim()
  );
  user = result.value;
  console.log(user);
});

//envio del formulario
const productForm = document.getElementById("form");
productForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const product = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value,
  };
  socketClient.emit("newProduct", product);
  productForm.reset();
});

//productos en tiempo real
const createTable = async (data) => {
  const response = await fetch("./templates/table.handlebars");
  const result = await response.text();
  const template = Handlebars.compile(result);
  const html = template({ products: data });
  return html;
};

socketClient.on("products", async (data) => {
  const htmlTable = await createTable(data);
  const productsContainer = document.getElementById("productsContainer");
  productsContainer.innerHTML = htmlTable;
});

//chat
socketClient.on("messages", async (dataMsg) => {
  let messageElements = "";
  dataMsg.forEach((msg) => {
    messageElements += `<div><strong>${msg.username} - ${msg.timestamp}:</strong> ${msg.message}</div>`;
  });
  const chatContainer = document.getElementById("chatContainer");
  chatContainer.innerHTML = dataMsg.length > 0 ? messageElements : "";
});

//envio del mensaje del chat
const chatInput = document.getElementById("chatMsg");
const chatButton = document.getElementById("sendMsg");

chatButton.addEventListener("click", () => {
  socketClient.emit("newMessage", {
    author: user,
    text: chatInput.value,
    timestamp: new Date().toLocaleString(),
  });
  chatInput.value = "";
});
