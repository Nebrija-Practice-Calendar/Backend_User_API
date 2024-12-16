import mongoose from "mongoose";
import { RoleType } from "../types.ts";

const Schema = mongoose.Schema;

const roleSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true }
  },
  { timestamps: true }
);

export type roleSchemaModelType = mongoose.Document & Omit<RoleType, "id">

export const roleModel = mongoose.model<roleSchemaModelType>(
  "RoleType",
  roleSchema
);
