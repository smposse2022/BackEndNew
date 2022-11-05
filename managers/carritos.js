const fs = require("fs");
const path = require("path");

class ContenedorCarritos {
  constructor(nameFile) {
    this.nameFile = path.join(__dirname, `../files/${nameFile}`);
  }

  save = async (carrito) => {
    try {
      // Leer si el archivo existe
      if (fs.existsSync(this.nameFile)) {
        const contenido = await fs.promises.readFile(this.nameFile, "utf-8");
        if (contenido) {
          const carritos = JSON.parse(contenido);
          // Verificar si el producto ya existe en el archivo
          const newCarrito = {
            id: carritos.length + 1,
            ...carrito,
          };
          carritos.push(newCarrito);
          await fs.promises.writeFile(
            this.nameFile,
            JSON.stringify(carritos, null, 2)
          );
          return newCarrito;
        } else {
          const newCarrito = {
            id: 1,
            ...carrito,
          };
          // Creamos el archivo
          await fs.promises.writeFile(
            this.nameFile,
            JSON.stringify([newCarrito], null, 2)
          );
          return newCarrito;
        }
      } else {
        const newCarrito = {
          id: 1,
          ...carrito,
        };
        // Creamos el archivo
        await fs.promises.writeFile(
          this.nameFile,
          JSON.stringify([newCarrito], null, 2)
        );
        return newCarrito;
      }
    } catch (error) {
      console.log(error);
    }
  };

  getById = async (id) => {
    try {
      if (fs.existsSync(this.nameFile)) {
        const contenido = await fs.promises.readFile(this.nameFile, "utf-8");
        if (contenido) {
          const carritos = JSON.parse(contenido);
          const carrito = carritos.find((item) => item.id === id);
          return carrito;
        } else {
          return "El archivo está vacío";
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  getAll = async () => {
    const contenido = await fs.promises.readFile(this.nameFile, "utf-8");
    const carritos = JSON.parse(contenido);
    return carritos;
  };

  deleteById = async (id) => {
    const contenido = await fs.promises.readFile(this.nameFile, "utf-8");
    const carritos = JSON.parse(contenido);
    const carritosSinElBorrado = carritos.filter((item) => item.id !== id);
    await fs.promises.writeFile(
      this.nameFile,
      JSON.stringify(carritosSinElBorrado, null, 2)
    );
  };

  deleteAll = async () => {
    await fs.promises.writeFile(this.nameFile, JSON.stringify([], null, 2));
  };

  updateById = async (id, body) => {
    try {
      const carritos = await this.getAll();
      const carritoPos = productos.findIndex((el) => el.id === id);
      productos[carritoPos] = {
        id: id,
        ...body,
      };
      await fs.promises.writeFile(
        this.nameFile,
        json.stringify(carritos, null, 2)
      );
      return carritos;
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = ContenedorCarritos;
