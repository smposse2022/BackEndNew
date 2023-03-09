import { Context, helpers, MongoClient, config, ObjectId } from "../deps.ts";
import { User, UserInput } from "../model/dbModels/user.ts";

//const users: Array<User> = [];
const { MONGO_URL } = config();

// conexión con Mongo
const client = new MongoClient();
try {
  await client.connect(MONGO_URL);
  console.log(`Conexión exitosa a la base de datos`);
} catch (error) {
  console.log(`Hubo un error al conectar a la base de datos ${error}`);
}

// creamos una instancia de la base de datos
const db = client.database("denoDB");
const userModel = db.collection("users");

export const findUserAll = async (ctx: Context) => {
  try {
    const users = await userModel.find().toArray();
    ctx.response.status = 200;
    ctx.response.body = { data: users };
  } catch (error) {
    ctx.response.status = 401;
    ctx.response.body = { message: `hubo un error ${error.message}` }; // res.json
  }
};

export const findUserById = async (ctx: Context) => {
  try {
    const { id } = helpers.getQuery(ctx, { mergeParams: true }); // req.params
    const user = await userModel.findOne({ _id: new ObjectId(id) });
    ctx.response.status = 200;
    ctx.response.body = { data: user };
  } catch (error) {
    ctx.response.status = 401;
    ctx.response.body = { message: `hubo un error ${error.message}` }; // res.json
  }
};

export const createUser = async (ctx: Context) => {
  try {
    //const { name, age } = await ctx.request.body().value; // req.body
    const body: UserInput = await ctx.request.body().value; // req.body
    await userModel.insertOne(body);
    //const newUser: User = {
    //id: Math.random().toString(),
    //name: name,
    //age: age,
    ctx.response.status = 200;
    ctx.response.body = { data: "User created" };
    //users.push(newUser);
  } catch (error) {
    ctx.response.status = 401;
    ctx.response.body = { message: `hubo un error ${error.message}` }; // res.json
  }
};

export const deleteAllUsers = async (ctx: Context) => {
  try {
    await userModel.deleteMany({});
    ctx.response.status = 200;
    ctx.response.body = { data: "All Users deleted" };
    //users.push(newUser);
  } catch (error) {
    ctx.response.status = 401;
    ctx.response.body = { message: `hubo un error ${error.message}` }; // res.json
  }
};

export const deleteUserById = async (ctx: Context) => {
  try {
    const { id } = helpers.getQuery(ctx, { mergeParams: true }); // req.params
    await userModel.deleteOne({ _id: new ObjectId(id) });
    ctx.response.status = 200;
    ctx.response.body = { data: "User deleted" };
  } catch (error) {
    ctx.response.status = 401;
    ctx.response.body = { message: `hubo un error ${error.message}` }; // res.json
  }
};

export const updateUserById = async (ctx: Context) => {
  try {
    const { id } = helpers.getQuery(ctx, { mergeParams: true }); // req.params
    const body: UserInput = await ctx.request.body().value;
    await userModel.updateOne(
      { _id: new ObjectId(id) },
      { $set: { name: body.name, age: body.age } }
    );
    ctx.response.status = 200;
    ctx.response.body = { data: "User modified" };
  } catch (error) {
    ctx.response.status = 401;
    ctx.response.body = { message: `hubo un error ${error.message}` }; // res.json
  }
};
