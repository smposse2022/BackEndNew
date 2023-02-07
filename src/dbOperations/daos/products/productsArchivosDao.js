import { ContenedorArchivos } from "../../managers/contenedorArchivos.js";

//crear una subclases de productos que trabaje con el contendor Archivos
class ProductsArchivosDao extends ContenedorArchivos {
  constructor(namefile) {
    //ejecutamos el contructor de clase ContenedorArchivos
    super(namefile);
  }
}

export { ProductsArchivosDao };
