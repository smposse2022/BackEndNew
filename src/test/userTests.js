import supertest from "supertest";
import { expect } from "chai";
import { app } from "../../server.js";

const request = supertest(app);

//pruebas de los endpoints de los usuarios
describe("api users test", () => {
  /*before(() => {
    console.log("codigo ejecutado al inicio de todas las pruebas");
  }); //este metodo se ejcuta al inicio de todas las pruebas

  beforeEach(() => {
    console.log("este codigo se ejeucta antes de cada prueba");
  });

  after(() => {
    console.log("este codigo se ejcuta al final de todas las pruebas");
  });

  afterEach(async () => {
    console.log("este codigo se ececuta al final de cada prueba");
    await request.delete("/users");
  });*/

  //prueba para get users
  it("get users", async () => {
    // para asegurarme que la base de datos esté vacía, primero borro todos los usuarios
    const deleteResponse = await request.delete("/api/auth/users");
    const response = await request.get("/api/auth/users");
    //console.log(response.body);
    expect(response.status).equal(200);
    expect(response.body.Usuarios).to.eql([]);
  });

  //prueba para agregar un usuario
  it("after create a new user, the user created should have an id assigned", async () => {
    const response = await request.post("/api/auth/user").send({
      email: "maildeprueba@gmail.com",
      password: "1234",
      nombre: "Usuario de Prueba 1",
      direccion: "Calle falsa 123",
      edad: "30",
      telefono: "1530296235",
      fotoUrl: "Soy una foto",
    });
    expect(response.status).equal(200);
    expect(response.body.NewUser).to.have.own.property("_id");
  });

  it("after create a user, the user list should have a new element", async () => {
    const response = await request.get("/api/auth/users");
    expect(response.status).equal(200);
    expect(response.body.Usuarios.length).to.eql(1);
  });

  it("if a user exists in our database, should be possible to delete that user", async () => {
    const response = await request.get("/api/auth/users");
    const userId = response.body.Usuarios[0]._id;
    const responseDelete = await request.delete(`/api/auth/user/${userId}`);
    expect(responseDelete.body.message).equal("delete successfully");
  });
});
