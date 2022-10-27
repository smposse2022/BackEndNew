const fs = require("fs");
const path = require("path");

class ContenedorWebsocket {
  constructor(nameFile) {
    this.nameFile = nameFile;
  }
  save = async (obj) => {
    await fs.promises.writeFile(this.nameFile, JSON.stringify(obj, null, 2));
  };
  getAll = async () => {
    if (this.nameFile) {
      const contenido = await fs.promises.readFile(this.nameFile, "utf-8");
      if (contenido) {
        const mensajes = JSON.parse(contenido);
        return mensajes;
      } else {
      }
    }
  };
}
module.exports = ContenedorWebsocket;
