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
        edad:Number
        telefono:String,
        fotoUrl:String
    }
    input UserInput{
        email:String,
        password:String,
        nombre:String,
        direccion:String,
        edad:Number
        telefono:String,
        fotoUrl:String
    }
    type Product{
        _id:String,
        title:String,
        price:Number,
        thumbnail:String
    }
    input ProductInput{
        title:String,
        price:Number,
        thumbnail:String
    }
    type Cart{
        _id:String,
        products:Array
    }
    input CartInput{
        products:Array
    }
    type Query{
        getUsers: [User],
        getUserById(_id:String): User
    }
    type Mutation{
        addUser(user:UserInput): User,
        deleteUserById(_id:String): String
    }
`);

/*export const GraphqlController = () => {
  return graphqlHTTP({
    schema: graphqlSchema,
    rootValue: root,
    graphiql: true,
  });
};
*/
