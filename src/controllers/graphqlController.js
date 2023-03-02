import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
import { root } from "../services/graphqlServices.js";

//configuracion de graphql
const graphqlSchema = buildSchema(`
    type User{
        _id:String,
        email:String,
        password:String,
        nombre:String,
        direccion:String,
        edad:Int
        telefono:String,
        fotoUrl:String
    }
    input UserInput{
        email:String,
        password:String,
        nombre:String,
        direccion:String,
        edad:Int
        telefono:String,
        fotoUrl:String
    }
    type Product{
        _id:String,
        title:String,
        price:Int,
        thumbnail:String
    }
    input ProductInput{
        title:String,
        price:Int,
        thumbnail:String
    }
    type Cart{
        _id:String,
        products:[Product]
    }
    input CartInput{
        products:[Product]
    }
    type Query{
        getUsers: [User],
        getUserById(_id:String): User,
        getProducts: [Product],
        getProductById(_id:String): Product,
    }
    type Mutation{
        addUser(user:UserInput): User,
        deleteUserById(_id:String): String,
        addProduct(newProduct:ProductInput):Product,
        deleteProductById(_id:String): String,
    }
`);

export const GraphqlController = () => {
  return graphqlHTTP({
    schema: graphqlSchema,
    rootValue: root,
    graphiql: true,
  });
};
