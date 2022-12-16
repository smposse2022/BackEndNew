import { numerosAlAzar } from "./helpers/operaciones.js";

//solo cuando trabajemos con modulos de es6
process.send("listo"); //proceso hijo listo para trabajar

////recibimos los mensajes del proceso padre.
process.on("message", (parentMsg, cant) => {
  // console.log("parentMsg", parentMsg);
  if (parentMsg === "Iniciar") {
    const resultadoFinal = numerosAlAzar(cant);
    //enviamos el resultado de la operacion del proceso hijo al proceso padre
    process.send(resultadoFinal);
  }
});
