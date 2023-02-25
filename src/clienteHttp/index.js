import http from "http";
import https from "https";

// https://jsonplaceholder.typicode.com/users

const URL = "http://localhost:8081";

//opciones de la solicitud
const options = {
  hostname: URL,
  port: 80,
  path: "/api/productos",
  method: "GET",
};

//crear la solicitud http
const req = http.request(options, (res) => {
  let datos = "";
  res.on("data", (chunk) => {
    datos += chunk.toString();
  });

  res.on("end", () => {
    const response = JSON.parse(datos);
    console.log(response);
  });
});

req.on("error", (error) => console.log(error));

req.end();
