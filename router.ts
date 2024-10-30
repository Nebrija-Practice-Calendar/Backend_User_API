import { Router } from "express";
import { postLoginUser } from "./resolvers/post/postLoginUser.ts";
import { postRegisterUser } from "./resolvers/post/postRegisterUser.ts";
import { getUsers } from "./resolvers/get/getUsers.ts";
import { deleteUserID } from "./resolvers/delete/deleteUser.ts";
import { putRoleUser } from "./resolvers/put/putRoleUser.ts";

export const router = new Router();

router
  .post("/login", postLoginUser)
  .post("/register", postRegisterUser)
  .get("/users", getUsers)
  .delete("/users/:id", deleteUserID)
  .put("/updateUser", putRoleUser);
