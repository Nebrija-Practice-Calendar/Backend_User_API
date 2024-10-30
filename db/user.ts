import mongoose from "mongoose";
import { UserType } from "../types.ts";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
  },
  { timestamps: true }
);

export type userSchemaModelType = mongoose.Document & Omit<UserType, "id">

export const userModel = mongoose.model<userSchemaModelType>(
  "UserType",
  userSchema
);
