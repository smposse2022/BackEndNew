import { Router } from "../deps.ts";
import {
  findUserAll,
  findUserById,
  createUser,
  deleteAllUsers,
  deleteUserById,
  updateUserById,
} from "../controllers/user.controller.ts";

export const userRouter = new Router()
  .get("/users", findUserAll)
  .get("/users/:id", findUserById)
  .post("/users", createUser)
  .delete("/users", deleteAllUsers)
  .delete("/users/:id", deleteUserById)
  .put("/users/:id", updateUserById);
