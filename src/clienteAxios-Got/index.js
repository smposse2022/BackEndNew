import axios from "axios";
import got from "got";

const baseURL = "http://localhost:8081/api";

//peticion con axios
const getProductsAxios = async () => {
  try {
    const response = await axios.get(`${baseURL}/productos`);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

const getOneProductAxios = async () => {
  try {
    const response = await axios.get(
      `${baseURL}/productos?id=63f36bc4916794b0df825d8e`
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

const deleteOneProductAxios = async () => {
  try {
    const response = await axios.get(
      `${baseURL}/productos?id=63f36bc4916794b0df825d8e`
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

const saveNewProductAxios = async () => {
  try {
    const response = await axios.post(`${baseURL}/productos`, {
      title: "Producto desde Axios",
      price: 5000,
      thumbnail: "FotoProductoAxios",
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
/*//peticion con axios
const getDataGot = async () => {
  try {
    const response = await got.get(`${baseURL}/users`);
    const data = JSON.parse(response.body);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};*/

//getDataGot();
//getProductsAxios();
getOneProductAxios();
//saveNewProductAxios();
//deleteOneProductAxios();

// nodemon src/clienteAxios-Got/index.js
