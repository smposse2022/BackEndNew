import supertest from "supertest";
import { expect } from "chai";
import { app } from "../../server.js";

const request = supertest(app);

//pruebas de los endpoints de los productos
describe("api products test", () => {
  //prueba para get products
  it("get products", async () => {
    // para asegurarme que la base de datos esté vacía, primero borro todos los productos
    const deleteResponse = await request.delete("/api/productos");
    const response = await request.get("/api/productos");
    expect(response.status).equal(200);
    expect(response.body.Productos).to.eql([]);
  });

  //prueba para agregar un usuario
  it("after create a new product, the product created should have an id assigned", async () => {
    const response = await request.post("/api/productos").send({
      title: "Producto de prueba 1",
      price: 5000,
      thumbnail: "Foto del producto de Prueba 1",
    });
    expect(response.status).equal(200);
    expect(response.body.NewProduct).to.have.own.property("_id");
  });

  it("after create a product, the product list should have a new element", async () => {
    const response = await request.get("/api/productos");
    expect(response.status).equal(200);
    expect(response.body.Productos.length).to.eql(1);
  });

  it("if a product exists in our database, should be possible to delete that product", async () => {
    const response = await request.get("/api/productos");
    const prodId = response.body.Productos[0]._id;
    const responseDelete = await request.delete(`/api/productos/${prodId}`);
    expect(responseDelete.body.message).equal("delete successfully");
  });
});
