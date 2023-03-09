import { ObjectId } from "../../deps.ts";

export interface User {
  _id: ObjectId;
  name: string;
  age: number;
}

export interface UserInput {
  name: string;
  age: number;
}
