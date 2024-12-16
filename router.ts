import { Router } from "express";
import { postLoginUser } from "./resolvers/post/User/postLoginUser.ts";
import { postRegisterUser } from "./resolvers/post/User/postRegisterUser.ts";
import { postProfile } from "./resolvers/post/Profile/postProfile.ts";
import { getUsers } from "./resolvers/get/User/getUsers.ts";
import { getProfiles } from "./resolvers/get/Profile/getProfiles.ts";
import { deleteUserID } from "./resolvers/delete/User/deleteUserID.ts";
import { deleteProfileID } from "./resolvers/delete/Profile/deleteProfileID.ts";
import { putRoleUser } from "./resolvers/put/User/putRoleUser.ts";

export const router = new Router();

router
  .post("/login", postLoginUser)
  .post("/register", postRegisterUser)
  .post("/profile", postProfile)
  .get("/users", getUsers)
  .get("/profiles", getProfiles)
  .delete("/userDelete", deleteUserID)
  .delete("/profileDelete", deleteProfileID)
  .put("/updateUser", putRoleUser);
